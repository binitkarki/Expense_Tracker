// src/RecentlyAdded.jsx
import "../styles/RecentlyAdded.css";

function RecentlyAdded({ transactions }) {
  return (
    <div className="recently-added">
      <h3>Recently added</h3>
      <ul>
        {transactions.slice(0, 15).map(tx => (
          <li key={tx.id} className={tx.kind}>
            <span className="label">{tx.kind === "income" ? "Income" : "Expense"}</span>
            <span className="title">{tx.title || tx.category?.name}</span>
            <span className="amount">{tx.kind === "income" ? "+₨" : "-₨"} {tx.amount}</span>
            <span className="category" style={{ backgroundColor: tx.category?.color || "#eee" }}>{tx.category?.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentlyAdded;
