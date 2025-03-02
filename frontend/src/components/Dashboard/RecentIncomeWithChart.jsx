import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const COLORS = ["#4084f4", "#FA2C37", "#FF6900", "#4F39F6"];

  const prepareChartData = () => {
    if (Array.isArray(data)) {
      const dataArr = data.map((item) => ({
        source: item?.source,
        amount: item?.amount,
      }));
      setChartData(dataArr);
    }
  };

  useEffect(() => {
    prepareChartData();
    return () => {};
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`Rs.${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
