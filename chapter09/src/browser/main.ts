import { Block, Blockchain } from "../lib/bc_transactions";

// App의 상태
enum Status {
  Initialization = "⏳ Initializing the blockchain, creating the genesis block...",
  AddTransaction = "💸 Add one or more transactions.",
  ReadyToMine = "✅ Ready to mine a new block.",
  MineInProgress = "⏳ Mining a new block...",
}

// HTML Elements
const amountEl = document.getElementById("amount") as HTMLInputElement;
const blocksEl = document.getElementById("blocks") as HTMLDivElement;
const confirmEl = document.getElementById("confirm") as HTMLButtonElement;
const pendingTransactionsEl = document.getElementById(
  "pending-trnsactions"
) as HTMLPreElement;
const recipeintEl = document.getElementById("recipient") as HTMLInputElement;
const senderEl = document.getElementById("sender") as HTMLInputElement;
const statusEl = document.getElementById("status") as HTMLParagraphElement;
const transferBtn = document.getElementById("transfer") as HTMLButtonElement;

const main = (async (): Promise<void> => {
  // Subscrive to events
  transferBtn.addEventListener("click", addTransaction);
  confirmEl.addEventListener("click", mineBlock);

  statusEl.textContent = Status.Initialization;

  const blockchain = new Blockchain();
  await blockchain.createGenesisBlock();
  blocksEl.innerHTML = blockchain.chain
    .map((b, i) => generateBlockHtml(b, i))
    .join("");

  statusEl.textContent = Status.AddTransaction;
  toggleState(true, false);

  function addTransaction() {
    blockchain.createTransaction({
      sender: senderEl.value,
      recipient: recipeintEl.value,
      amount: parseInt(amountEl.value),
    });

    toggleState(false, false);
    pendingTransactionsEl.textContent = blockchain.pendingTransactions
      .map((t) => `${t.sender} => ${t.recipient}: ${t.amount}`)
      .join("\n");
    statusEl.textContent = Status.ReadyToMine;

    // Reset form's value
    senderEl.value = "";
    recipeintEl.value = "";
    amountEl.value = "0";
  }

  async function mineBlock() {
    statusEl.textContent = Status.MineInProgress;
    toggleState(true, true);
    await blockchain.minePendingTransactions();

    pendingTransactionsEl.textContent = "No Pending transactions at the moment";
    statusEl.textContent = Status.AddTransaction;
    blocksEl.innerHTML = blockchain.chain
      .map((b, i) => generateBlockHtml(b, i))
      .join("");
    toggleState(true, true);
  }
})();

function toggleState(confirmations: boolean, transferForm: boolean): void {
  transferBtn.disabled =
    amountEl.disabled =
    senderEl.disabled =
    recipeintEl.disabled =
      transferForm;
  confirmEl.disabled = confirmations;
}

function generateBlockHtml(block: Block, index: number) {
  return `
    <div class="block">
      <span class="block__index">#${index}</span>
      <span class="block__timestamp">${new Date(
        block.timestamp
      ).toLocaleTimeString()}</span>
      <div class="prev-hash">
        <div class="hash-title">← PREV HASH</div>
        <div class="hash-value">${block.previousHash}</div>
      </div>
      <div class="this-hash">
        <div class="hash-title">THIS HASH</div>
        <div class="hash-value">${block.hash}</div>
      </div>
      <div class="block__transactions">
        <div class="hash-title">TRANSACTIONS</div>
        <pre class="transactions-value">${block.transactions.map(
          (t) => `${t.sender} → ${t.recipient} - $${t.amount}`
        )}</pre>
      </div>
    </div>

  `;
}
