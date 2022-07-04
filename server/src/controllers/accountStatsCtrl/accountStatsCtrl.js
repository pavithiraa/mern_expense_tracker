const expressAsyncHandler = require("express-async-handler");
const Expense = require("../../model/Expense");
const Income = require("../../model/Income");

const accountStatsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    //Expenses statistics
    //aggregate means to add something together..
    //aggregate is a method,to add the additional methods on pipeline
    //it has some steps to follow:1. filter the fields we needed and group them together
    const expenseStats = await Expense.aggregate([
      //filter
      { $match: { amount: { $gte: 0 } } },
      //group
      {
        $group: {
          _id: null,
          averageExp: { $avg: "$amount" },
          totalExp: { $sum: "$amount" },
          minExp: { $min: "$amount" },
          maxExp: { $max: "$amount" },
          totalRecExp: { $sum: 1 },
        },
      },
    ]);

    //income statistics
    const incomeStats = await Income.aggregate([
      //filter
      { $match: { amount: { $gte: 0 } } },
      //group
      {
        $group: {
          _id: null,
          averageIncome: { $avg: "$amount" },
          totalIncome: { $sum: "$amount" },
          minIncome: { $min: "$amount" },
          maxIncome: { $max: "$amount" },
          totalRecIncome: { $sum: 1 },
        },
      },
    ]);
    res.json({ expenseStats, incomeStats });
  } catch (error) {
    res.json(err);
  }
});

module.exports = accountStatsCtrl;
