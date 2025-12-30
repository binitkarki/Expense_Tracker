// src/CategorySelector.jsx
import { useState } from "react";
import "../styles/CategorySelector.css";

function CategorySelector({ categories, onAddCategory, onSelect }) {
  const [showCategories, setShowCategories] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [color, setColor] = useState("#007bff");

  const handleAdd = () => {
    if (newCategory.trim()) {
      onAddCategory({ name: newCategory.trim(), color });
      setNewCategory("");
      setColor("#007bff");
    }
  };

  return (
    <div className="category-selector">
      <button onClick={() => setShowCategories(!showCategories)}>
        Choose Category
      </button>

      {showCategories && (
        <div className="category-grid">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className="category-btn"
              style={{ backgroundColor: cat.color }}
              onClick={() => onSelect(cat.name)}
            >
              {cat.name}
            </button>
          ))}
          <div className="category-add">
            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category"
            />
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <button onClick={handleAdd} className="add-btn">+</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategorySelector;
