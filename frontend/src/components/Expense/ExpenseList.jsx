import moment from "moment";
import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const ExpenseList = ({ transaction, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className=" text-lg">All Expenses</h5>

        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {Array.isArray(transaction) && transaction.length > 0 ? (
          transaction.map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense._id)}
            />
          ))
        ) : (
          <p>No expense records found.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
