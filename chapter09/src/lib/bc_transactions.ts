// 거래내역을 가진 블록을 생성하는 작은 라이브러리
// blockchain app이 브라우저에서 작동하는지, 독립형 JS엔진에서 실행되는지를 확인함
// SHA -256 해시 생성을 위한 API를 제공함.

import { sha256 } from "./universal_sha256";

// transaction의 custom type
export interface Transaction {
  readonly sender: string;
  readonly recipient: string;
  readonly amount: number;
}

// block의 custom type
export class Block {
  nonce: number = 0;
  hash!: string;

  constructor(
    readonly previousHash: string,
    readonly timestamp: number,
    readonly transactions: Transaction[]
  ) {}

  // 블록을 채굴하는 async 함수
  // mine 함수는 아무것도 return하지 않는데 왜 Promise<void>를 wrapping 해줄까?
  // 문제는 async 키워드로 표시된 모든 함수가 Promise를 반환해야한다는 것.
  // Promise는 Generic 타입이며 타입 parameter와 함께 사용해야한다. -> Promise<void>를 사용해 빈 값을 반환하도록 지정하므로 return문은 필요 없다. (이미 있는 것)
  async mine(): Promise<void> {
    do {
      // nonce 값을 찾기 위해 bruteforce로 ++ 대입해줌.
      this.hash = await this.calculateHash(++this.nonce);
    } while (this.hash.startsWith("0000") === false);
  }

  // 해시 생성을 위한 async wrapper 함수
  private async calculateHash(nonce: number): Promise<string> {
    const data =
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.transactions) +
      nonce;
    return sha256(data);
  }
}

export class Blockchain {
  private readonly _chain: Block[] = [];
  private _pendingTransactions: Transaction[] = [];

  // 가장 최근 추가된 block을 가져오는 getter 함수
  private get latestBlock(): Block {
    return this._chain[this._chain.length - 1];
  }

  // 모든 블록을 가져오는 getter 함수
  get chain(): Block[] {
    return [...this._chain];
  }

  // 보류 중인 모든 거래 내역을 가져오는 getter 함수
  get pendingTransactions(): Transaction[] {
    return [...this._pendingTransactions];
  }

  // Genesis 블록 생성
  async createGenesisBlock(): Promise<void> {
    const genesisBlock = new Block("0", Date.now(), []);
    await genesisBlock.mine();
    this._chain.push(genesisBlock);
  }

  // pending 중인 거래내역을 추가함.
  createTransaction(transaction: Transaction): void {
    this._pendingTransactions.push(transaction);
  }

  // pending 중인 거래 내역을 block으로 만든 후 블록체인에 추가함.
  async minePendingTransactions(): Promise<void> {
    const block = new Block(
      this.latestBlock.hash,
      Date.now(),
      this._pendingTransactions
    );
    await block.mine();
    this._chain.push(block);
    this._pendingTransactions = [];
  }
}
