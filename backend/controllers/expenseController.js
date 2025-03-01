const Expense = require("../models/expenseModel");
const xlsx = require("xlsx");

//add expense
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    //validation: check for missing fields
    if (!date || !category || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = await Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json({
      newExpense,
      message: "Expense added successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// get all expense category
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// delete expense
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// download excel file
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    //prepare data for excel
    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "expense");
    xlsx.writeFile(wb, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
