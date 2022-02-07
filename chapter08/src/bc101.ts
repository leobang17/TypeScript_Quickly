import * as crypto from "crypto";

class Block {
  readonly hash: string; //block hash

  constructor(
    readonly index: number, // 순차적인 블록 index
    readonly previousHash: string, // 이전 블록의 hash 값
    readonly timestamp: number, // 블록이 생성된 시간
    readonly data: string // 앱 관련 데이터
  ) {
    this.hash = this.calculateHash(); // 생성된 블록의 해시 값을 계산
  }

  private calculateHash(): string {
    const data = this.index + this.previousHash + this.timestamp + this.data;
    return crypto.createHash("sha256").update(data).digest("hex");
    // SHA-256 해시를 생성하기 위해 Hash의 instane를 생성하고 -> Hash 객체 내 해시 값을 계산하고 업데이트 -> 해시 값을 16 진수 (hex)로 변환
  }
}

class Blockchain {
  private readonly chain: Block[] = [];
  private get latestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  constructor() {
    // create the genesis block
    this.chain.push(new Block(0, "0", Date.now(), "Genesis Block"));
  }

  addBlock(data: string): void {
    const block = new Block(
      this.latestBlock.index + 1,
      this.latestBlock.hash,
      Date.now(),
      data
    );
    this.chain.push(block);
  }
}

console.log("Creating the blockchain with the genesis block...");
const blockchain = new Blockchain();

console.log("Mining block #1 ...");
blockchain.addBlock("First Block");

console.log("Mining block #2 ...");
blockchain.addBlock("Second Block");

console.log(JSON.stringify(blockchain, null, 2));
