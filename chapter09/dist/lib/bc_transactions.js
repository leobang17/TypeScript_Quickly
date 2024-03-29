// 거래내역을 가진 블록을 생성하는 작은 라이브러리
// blockchain app이 브라우저에서 작동하는지, 독립형 JS엔진에서 실행되는지를 확인함
// SHA -256 해시 생성을 위한 API를 제공함.
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
import { sha256 } from "./universal_sha256.js";
// block의 custom type
var Block = /** @class */ (function () {
  function Block(previousHash, timestamp, transactions) {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.nonce = 0;
  }
  // 블록을 채굴하는 async 함수
  // mine 함수는 아무것도 return하지 않는데 왜 Promise<void>를 wrapping 해줄까?
  // 문제는 async 키워드로 표시된 모든 함수가 Promise를 반환해야한다는 것.
  // Promise는 Generic 타입이며 타입 parameter와 함께 사용해야한다. -> Promise<void>를 사용해 빈 값을 반환하도록 지정하므로 return문은 필요 없다. (이미 있는 것)
  Block.prototype.mine = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _a;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            // nonce 값을 찾기 위해 bruteforce로 ++ 대입해줌.
            _a = this;
            return [4 /*yield*/, this.calculateHash(++this.nonce)];
          case 1:
            // nonce 값을 찾기 위해 bruteforce로 ++ 대입해줌.
            _a.hash = _b.sent();
            _b.label = 2;
          case 2:
            if (this.hash.startsWith("0000") === false) return [3 /*break*/, 0];
            _b.label = 3;
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  // 해시 생성을 위한 async wrapper 함수
  Block.prototype.calculateHash = function (nonce) {
    return __awaiter(this, void 0, void 0, function () {
      var data;
      return __generator(this, function (_a) {
        data =
          this.previousHash +
          this.timestamp +
          JSON.stringify(this.transactions) +
          nonce;
        return [2 /*return*/, sha256(data)];
      });
    });
  };
  return Block;
})();
export { Block };
var Blockchain = /** @class */ (function () {
  function Blockchain() {
    this._chain = [];
    this._pendingTransactions = [];
  }
  Object.defineProperty(Blockchain.prototype, "latestBlock", {
    // 가장 최근 추가된 block을 가져오는 getter 함수
    get: function () {
      return this._chain[this._chain.length - 1];
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(Blockchain.prototype, "chain", {
    // 모든 블록을 가져오는 getter 함수
    get: function () {
      return __spreadArray([], this._chain, true);
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(Blockchain.prototype, "pendingTransactions", {
    // 보류 중인 모든 거래 내역을 가져오는 getter 함수
    get: function () {
      return __spreadArray([], this._pendingTransactions, true);
    },
    enumerable: false,
    configurable: true,
  });
  // Genesis 블록 생성
  Blockchain.prototype.createGenesisBlock = function () {
    return __awaiter(this, void 0, void 0, function () {
      var genesisBlock;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            genesisBlock = new Block("0", Date.now(), []);
            return [4 /*yield*/, genesisBlock.mine()];
          case 1:
            _a.sent();
            this._chain.push(genesisBlock);
            return [2 /*return*/];
        }
      });
    });
  };
  // pending 중인 거래내역을 추가함.
  Blockchain.prototype.createTransaction = function (transaction) {
    this._pendingTransactions.push(transaction);
  };
  // pending 중인 거래 내역을 block으로 만든 후 블록체인에 추가함.
  Blockchain.prototype.minePendingTransactions = function () {
    return __awaiter(this, void 0, void 0, function () {
      var block;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            block = new Block(
              this.latestBlock.hash,
              Date.now(),
              this._pendingTransactions
            );
            return [4 /*yield*/, block.mine()];
          case 1:
            _a.sent();
            this._chain.push(block);
            this._pendingTransactions = [];
            return [2 /*return*/];
        }
      });
    });
  };
  return Blockchain;
})();
export { Blockchain };
//# sourceMappingURL=bc_transactions.js.map
