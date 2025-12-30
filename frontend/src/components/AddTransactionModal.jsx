import { useMemo, useState } from "react";
import api from "../api";
import "../styles/AddTransactionModal.css";

function AddTransactionModal({ onClose, onAdded, categories }) {
  const [mode, setMode] = useState("expense");
  const [form, setForm] = useState({ title: "", amount: "", category_id: "", description: "" });
  const [showCatButtons, setShowCatButtons] = useState(false);

  const filtered = useMemo(
    () => categories.filter(c => c.kind === mode),
    [categories, mode]
  );

  const submit = async (e) => {
    e.preventDefault();
    if (!form.amount || !form.category_id) {
      alert("Amount and category are required");
      return;
    }
    await api.post("transactions/", {
      kind: mode,
      title: mode === "expense" ? form.title : "",
      amount: form.amount,
      category_id: form.category_id,
      description: form.description,
    });
    await onAdded();
    onClose();
  };

  return (
    <div className="modal">
      <form className="modal-form" onSubmit={submit}>
        <div className="mode-toggle">
          <button type="button" className={mode === "expense" ? "active" : "inactive"} onClick={() => setMode("expense")}>Expense</button>
          <button type="button" className={mode === "income" ? "active" : "inactive"} onClick={() => setMode("income")}>Income</button>
        </div>

        {mode === "expense" && (
          <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        )}

        <input type="number" placeholder="Amount (₨)" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required />

        <div className="category-picker">
          <button type="button" className="choose-btn" onClick={() => setShowCatButtons(!showCatButtons)}>Choose category</button>
          {showCatButtons && (
            <div className="category-grid">
              {filtered.map(cat => (
                <button key={cat.id} className="category-chip" style={{ backgroundColor: cat.color }} onClick={() => setForm({ ...form, category_id: String(cat.id) })}>
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <textarea placeholder="Description (optional)" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />

        <div className="modal-actions">
          <button type="submit">Save</button>
          <button type="button" className="cancel" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddTransactionModal;
