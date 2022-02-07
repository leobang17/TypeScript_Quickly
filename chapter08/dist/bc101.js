"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
class Block {
    constructor(index, // 순차적인 블록 index
    previousHash, // 이전 블록의 hash 값
    timestamp, // 블록이 생성된 시간
    data // 앱 관련 데이터
    ) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash(); // 생성된 블록의 해시 값을 계산
    }
    calculateHash() {
        const data = this.index + this.previousHash + this.timestamp + this.data;
        return crypto.createHash("sha256").update(data).digest("hex");
        // SHA-256 해시를 생성하기 위해 Hash의 instane를 생성하고 -> Hash 객체 내 해시 값을 계산하고 업데이트 -> 해시 값을 16 진수 (hex)로 변환
    }
}
class Blockchain {
    constructor() {
        this.chain = [];
        // create the genesis block
        this.chain.push(new Block(0, "0", Date.now(), "Genesis Block"));
    }
    get latestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(data) {
        const block = new Block(this.latestBlock.index + 1, this.latestBlock.hash, Date.now(), data);
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
