// src/DashboardCharts.jsx
import { Pie, Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "../styles/DashboardCharts.css";

function DashboardCharts({ transactions, categories }) {
  const expensesOnly = transactions.filter(t => t.kind === "expense");

  const sumsByCategory = {};
  expensesOnly.forEach(tx => {
    const key = tx.category?.name || "Uncategorized";
    sumsByCategory[key] = (sumsByCategory[key] || 0) + parseFloat(tx.amount);
  });
  const labels = Object.keys(sumsByCategory);
  const dataVals = Object.values(sumsByCategory);
  const colorMap = Object.fromEntries(categories.map(c => [c.name, c.color]));
  const bgColors = labels.map(l => colorMap[l] || "#999");

  const pieData = { labels, datasets: [{ data: dataVals, backgroundColor: bgColors }] };
  const barData = {
    labels: expensesOnly.map(t => t.title || t.category?.name),
    datasets: [{ label: "Expense (₨)", data: expensesOnly.map(t => t.amount), backgroundColor: "#36a2eb" }],
  };
  const lineData = {
    labels: transactions.map(t => t.date),
    datasets: [{ label: "Trend (₨)", data: transactions.map(t => t.amount), borderColor: "#007bff", fill: false }],
  };

  return (
    <div className="charts">
      <div className="chart small">
        <h4>Expenses by category</h4>
        <Pie data={pieData} />
      </div>
      <div className="chart small">
        <h4>Recent expenses</h4>
        <Bar data={barData} />
      </div>
      <div className="chart small">
        <h4>Trend</h4>
        <Line data={lineData} />
      </div>
    </div>
  );
}
export default DashboardCharts;
