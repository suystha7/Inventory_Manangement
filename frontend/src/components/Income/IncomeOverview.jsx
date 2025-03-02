import React, { useEffect, useState } from "react";
import CustomBarChart from "../Charts/CustomBarChart";
import { LuPlus } from "react-icons/lu";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({ transcation, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transcation);
    setChartData(result);

    return () => {};
  }, [transcation]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income trends
          </p>
        </div>

        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      <div className="mt-10">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
