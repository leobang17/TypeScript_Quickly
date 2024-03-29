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
import { Blockchain } from "../lib/bc_transactions.js";
// App의 상태
var Status;
(function (Status) {
  Status["Initialization"] =
    "\u23F3 Initializing the blockchain, creating the genesis block...";
  Status["AddTransaction"] = "\uD83D\uDCB8 Add one or more transactions.";
  Status["ReadyToMine"] = "\u2705 Ready to mine a new block.";
  Status["MineInProgress"] = "\u23F3 Mining a new block...";
})(Status || (Status = {}));
// HTML Elements
var amountEl = document.getElementById("amount");
var blocksEl = document.getElementById("blocks");
var confirmEl = document.getElementById("confirm");
var pendingTransactionsEl = document.getElementById("pending-trnsactions");
var recipeintEl = document.getElementById("recipient");
var senderEl = document.getElementById("sender");
var statusEl = document.getElementById("status");
var transferBtn = document.getElementById("transfer");
var main = (function () {
  return __awaiter(void 0, void 0, void 0, function () {
    function addTransaction() {
      blockchain.createTransaction({
        sender: senderEl.value,
        recipient: recipeintEl.value,
        amount: parseInt(amountEl.value),
      });
      toggleState(false, false);
      pendingTransactionsEl.textContent = blockchain.pendingTransactions
        .map(function (t) {
          return ""
            .concat(t.sender, " => ")
            .concat(t.recipient, ": ")
            .concat(t.amount);
        })
        .join("\n");
      statusEl.textContent = Status.ReadyToMine;
      // Reset form's value
      senderEl.value = "";
      recipeintEl.value = "";
      amountEl.value = "0";
    }
    function mineBlock() {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              statusEl.textContent = Status.MineInProgress;
              toggleState(true, true);
              return [4 /*yield*/, blockchain.minePendingTransactions()];
            case 1:
              _a.sent();
              pendingTransactionsEl.textContent =
                "No Pending transactions at the moment";
              statusEl.textContent = Status.AddTransaction;
              blocksEl.innerHTML = blockchain.chain
                .map(function (b, i) {
                  return generateBlockHtml(b, i);
                })
                .join("");
              toggleState(true, true);
              return [2 /*return*/];
          }
        });
      });
    }
    var blockchain;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          // Subscrive to events
          transferBtn.addEventListener("click", addTransaction);
          confirmEl.addEventListener("click", mineBlock);
          statusEl.textContent = Status.Initialization;
          blockchain = new Blockchain();
          return [4 /*yield*/, blockchain.createGenesisBlock()];
        case 1:
          _a.sent();
          blocksEl.innerHTML = blockchain.chain
            .map(function (b, i) {
              return generateBlockHtml(b, i);
            })
            .join("");
          statusEl.textContent = Status.AddTransaction;
          toggleState(true, false);
          return [2 /*return*/];
      }
    });
  });
})();
function toggleState(confirmations, transferForm) {
  transferBtn.disabled =
    amountEl.disabled =
    senderEl.disabled =
    recipeintEl.disabled =
      transferForm;
  confirmEl.disabled = confirmations;
}
function generateBlockHtml(block, index) {
  return '\n    <div class="block">\n      <span class="block__index">#'
    .concat(index, '</span>\n      <span class="block__timestamp">')
    .concat(
      new Date(block.timestamp).toLocaleTimeString(),
      '</span>\n      <div class="prev-hash">\n        <div class="hash-title">\u2190 PREV HASH</div>\n        <div class="hash-value">'
    )
    .concat(
      block.previousHash,
      '</div>\n      </div>\n      <div class="this-hash">\n        <div class="hash-title">THIS HASH</div>\n        <div class="hash-value">'
    )
    .concat(
      block.hash,
      '</div>\n      </div>\n      <div class="block__transactions">\n        <div class="hash-title">TRANSACTIONS</div>\n        <pre class="transactions-value">'
    )
    .concat(
      block.transactions.map(function (t) {
        return ""
          .concat(t.sender, " \u2192 ")
          .concat(t.recipient, " - $")
          .concat(t.amount);
      }),
      "</pre>\n      </div>\n    </div>\n\n  "
    );
}
//# sourceMappingURL=main.js.map
