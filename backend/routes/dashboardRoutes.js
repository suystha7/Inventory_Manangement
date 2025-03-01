const express = require("express");
const {
    getDashboardData
} = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

const expenseRouter = express.Router();

expenseRouter.get("/", protect, getDashboardData);

module.exports = expenseRouter;
