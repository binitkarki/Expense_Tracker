import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "../styles/DashboardCharts.css";

function DashboardCharts({ expenses }) {
  const categories = {};
  expenses.forEach(exp => {
    categories[exp.category] = (categories[exp.category] || 0) + parseFloat(exp.amount);
  });

  const pieData = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"],
      },
    ],
  };

  const barData = {
    labels: expenses.map(e => e.title),
    datasets: [
      {
        label: "Amount",
        data: expenses.map(e => e.amount),
        backgroundColor: "#36a2eb",
      },
    ],
  };

  return (
    <div className="charts">
      <div className="chart">
        <h3>Expenses by Category</h3>
        <Pie data={pieData} />
      </div>
      <div className="chart">
        <h3>Transactions</h3>
        <Bar data={barData} />
      </div>
    </div>
  );
}

export default DashboardCharts;
