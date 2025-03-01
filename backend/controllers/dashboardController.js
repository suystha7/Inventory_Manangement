const Income = require("../models/incomeModel");
const Expense = require("../models/expenseModel");
const { Types, isValidObjectId } = require("mongoose");

// get Dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // fetch total income & expense
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    console.log("totalIncome", {
      totalIncome,
      userId: isValidObjectId(userId),
    });

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    console.log("totalExpense", {
      totalExpense,
      userId: isValidObjectId(userId),
    });

    // get income transcations in the last 60 days
    const last60DaysTransactionIncome = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // get total income for last 60 days
    const incomeLast60Days = last60DaysTransactionIncome.reduce(
      (sum, transcation) => sum + transcation.amount,
      0
    );

    // get expense transcations in the last 30 days
    const last30DaysTransactionExpense = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // get total expense for last 30 days
    const expenseLast30Days = last30DaysTransactionExpense.reduce(
      (sum, transcation) => sum + transcation.amount,
      0
    );

    //fetch last 5 transcations (income + expense)
    const lastTransactions = [
      ...(await Income.find({ userId })
        .sort({ date: -1 })
        .limit(5)
        .then((txns) =>
          txns.map((txn) => ({
            ...txn.toObject(),
            type: "income",
          }))
        )),
      ...(await Expense.find({ userId })
        .sort({ date: -1 })
        .limit(5)
        .then((txns) =>
          txns.map((txn) => ({
            ...txn.toObject(),
            type: "expense",
          }))
        )),
    ].sort((a, b) => b.date - a.date); // Sort latest first

    //final result
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpense: {
        total: expenseLast30Days,
        transcation: last30DaysTransactionExpense,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transcation: last60DaysTransactionIncome,
      },
      recentTranscation: lastTransactions,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
