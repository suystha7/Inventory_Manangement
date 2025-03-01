const express = require("express");
const {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");

const incomeRouter = express.Router();

incomeRouter.post("/add", protect, addIncome);
incomeRouter.get("/get", protect, getAllIncome);
incomeRouter.get("/downloadExcel", protect, downloadIncomeExcel);
incomeRouter.delete("/:id", protect, deleteIncome);

module.exports = incomeRouter;
