// src/AddExpense.jsx
import { useState } from "react";
import api from "../api";              // ✅ Axios instance with token interceptor
import "../styles/AddExpense.css";     // ✅ optional styling

function AddExpense({ onExpenseAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "OTHER",
    date: "",
    description: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("expenses/", formData)   // ✅ use api, not axios
      .then(() => {
        onExpenseAdded();             // refresh expenses list
        setFormData({                 // reset form
          title: "",
          amount: "",
          category: "OTHER",
          date: "",
          description: "",
        });
      })
      .catch(error => {
        console.error("Error adding expense:", error);
        alert("Failed to add expense. Please check if you are logged in.");
      });
  };

  return (
    <form className="add-expense-form" onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
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
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default AddExpense;
