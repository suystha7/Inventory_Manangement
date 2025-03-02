import React from "react";

const CustomToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-200">
        <p className="text-sm font-semibold text-blue-800 mb-1">
          {payload[0].name}
        </p>
        <p className="text-sm text-gray-600 font-medium">
          Amount: <span className="text-gray-900">Rs.{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomToolTip;
