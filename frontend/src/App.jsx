import { useEffect, useState } from "react";
import api from "./api";
import Login from "./components/Login";
import Register from "./components/Register";
import ProfileHeader from "./components/ProfileHeader";
import AddTransactionButton from "./components/AddTransactionButton";
import ManageCategoriesButton from "./components/ManageCategoriesButton";
import ManageCategories from "./components/ManageCategories";
import AddTransactionModal from "./components/AddTransactionModal";
import RecentlyAdded from "./components/RecentlyAdded";
import DashboardCharts from "./components/DashboardCharts";
import "./styles/App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showManageCat, setShowManageCat] = useState(false);

  const fetchAll = async () => {
    try {
      const [meRes, catRes, txRes] = await Promise.all([
        api.get("me/"),
        api.get("categories/"),
        api.get("transactions/"),
      ]);
      setUser(meRes.data);
      setCategories(catRes.data);
      setTransactions(txRes.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchAll();
  }, [isLoggedIn]);

  const totalIncome = transactions.filter(t => t.kind === "income")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const totalExpense = transactions.filter(t => t.kind === "expense")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const balance = totalIncome - totalExpense;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
    setUser(null);
    setCategories([]);
    setTransactions([]);
  };

  if (!isLoggedIn) {
    return showRegister ? (
      <Register onRegistered={() => setShowRegister(false)} />
    ) : (
      <Login onLogin={() => setIsLoggedIn(true)} switchToRegister={() => setShowRegister(true)} />
    );
  }

  return (
    <div className="app-container">
      <div className="sidebar">
        <ProfileHeader user={user} onLogout={handleLogout} />
        <div className="balance">
          Balance: {balance < 0 ? `-₨ ${Math.abs(balance)}` : `₨ ${balance}`}
        </div>
        <AddTransactionButton onClick={() => setShowModal(true)} />
        <ManageCategoriesButton onClick={() => setShowManageCat(true)} />
      </div>

      <div className="center">
        <RecentlyAdded transactions={transactions} />
      </div>

      <div className="right">
        <DashboardCharts transactions={transactions} categories={categories} />
      </div>

      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onAdded={fetchAll}
          categories={categories}
        />
      )}

      {showManageCat && (
        <ManageCategories
          onClose={() => setShowManageCat(false)}
          categories={categories}
          onSaved={async () => { await fetchAll(); setShowManageCat(false); }}
        />
      )}
    </div>
  );
}

export default App;
