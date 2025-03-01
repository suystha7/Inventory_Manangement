const express = require("express");
const {
  addExpense,
  getAllExpense,
  downloadExpenseExcel,
  deleteExpense,
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

const expenseRouter = express.Router();

expenseRouter.post("/add", protect, addExpense);
expenseRouter.get("/get", protect, getAllExpense);
expenseRouter.get("/downloadExcel", protect, downloadExpenseExcel);
expenseRouter.delete("/:id", protect, deleteExpense);

module.exports = expenseRouter;
