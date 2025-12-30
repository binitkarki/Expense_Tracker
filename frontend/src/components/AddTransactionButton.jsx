// src/AddTransactionButton.jsx
import "../styles/AddTransactionButton.css";

function AddTransactionButton({ onClick }) {
  return (
    <button className="add-fab" onClick={onClick} title="Add transaction">+</button>
  );
}
export default AddTransactionButton;
