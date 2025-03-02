import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#4084f4", "#37B24D", "#FDC700"];

const FinanceOverview = ({ totalBalance, totalExpense, totalIncome }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expense", amount: totalExpense },
  ];
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      <div className="mt-12">
        <CustomPieChart
          data={balanceData}
          label="Total Balance"
          totalAmount={`${totalBalance}`}
          colors={COLORS}
          showTextAnchor
        />
      </div>
    </div>
  );
};

export default FinanceOverview;
