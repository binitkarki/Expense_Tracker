// src/ManageCategoriesButton.jsx
import "../styles/AddTransactionButton.css";

function ManageCategoriesButton({ onClick }) {
  return (
    <button className="add-fab secondary" onClick={onClick} title="Add more categories">🏷️</button>
  );
}
export default ManageCategoriesButton;
