import axios from "axios";
import { useState } from "react";
import "../styles/Expenses.css";

function Expenses({ expenses, onExpenseUpdated }) {
  const [editingExpense, setEditingExpense] = useState(null);
  const [formData, setFormData] = useState({});

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/expenses/${id}/`)
      .then(() => onExpenseUpdated())
      .catch(error => console.error("Error deleting expense:", error));
  };

  const startEdit = (expense) => {
    setEditingExpense(expense.id);
    setFormData(expense);
  };

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios.get("http://127.0.0.1:8000/api/expenses/", {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
})
  .then(response => setExpenses(response.data))
  .catch(error => console.error(error));

  };

  return (
    <div className="expenses-container">
      <h1>Expenses</h1>
      <ul className="expenses-list">
        {expenses.map(expense => (
          <li key={expense.id}>
            {editingExpense === expense.id ? (
              <form onSubmit={handleEditSubmit}>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleEditChange}
                />
                <input
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleEditChange}
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleEditChange}
                >
                  <option value="FOOD">Food</option>
                  <option value="RENT">Rent</option>
                  <option value="TRAVEL">Travel</option>
                  <option value="UTILITIES">Utilities</option>
                  <option value="OTHER">Other</option>
                </select>
                <input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleEditChange}
                />
                <textarea
                  name="description"
                  value={formData.description || ""}
                  onChange={handleEditChange}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingExpense(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <span className="expense-title">{expense.title}</span>
                <span className="expense-amount">${expense.amount}</span>
                <span className="expense-category">({expense.category})</span>
                <button onClick={() => startEdit(expense)}>Edit</button>
                <button onClick={() => handleDelete(expense.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Expenses;
