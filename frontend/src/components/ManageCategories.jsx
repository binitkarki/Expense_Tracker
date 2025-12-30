// src/ManageCategories.jsx
import { useState } from "react";
import api from "../api";
import "../styles/ManageCategories.css";

function ManageCategories({ onClose, onSaved, categories }) {
  const [newCat, setNewCat] = useState({ name: "", color: "#007bff", kind: "expense" });

  const addCategory = async () => {
    if (!newCat.name.trim()) return;
    await api.post("categories/", newCat);
    setNewCat({ name: "", color: "#007bff", kind: "expense" });
    await onSaved();
  };

  return (
    <div className="manage-overlay">
      <div className="manage-card">
        <div className="manage-header">
          <h3>Manage Categories</h3>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        {categories.length === 0 ? (
          <p className="empty-msg">No categories yet. Add your first one below.</p>
        ) : (
          <div className="cat-list">
            {categories.map(cat => (
              <div className="cat-item" key={cat.id}>
                <span className="cat-name">{cat.name}</span>
                <div className="color-preview" style={{ backgroundColor: cat.color }}></div>
              </div>
            ))}
          </div>
        )}

        <div className="cat-add">
          <input
            placeholder="Category name"
            value={newCat.name}
            onChange={e => setNewCat({ ...newCat, name: e.target.value })}
          />
          <select
            value={newCat.kind}
            onChange={e => setNewCat({ ...newCat, kind: e.target.value })}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          {/* prettier color picker */}
          <input
            type="color"
            className="color-picker"
            value={newCat.color}
            onChange={e => setNewCat({ ...newCat, color: e.target.value })}
          />
          <button className="add-btn" onClick={addCategory}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default ManageCategories;
