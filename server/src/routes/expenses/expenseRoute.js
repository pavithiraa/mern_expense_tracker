const express = require("express");
const { createExpense ,getAllExpense,getExpenseDetail,updateExpense, deleteExpense} = require("../../controllers/expenses/expenseCtrl");
const authMiddleware = require("../../middlewares/authMiddleware");


const expenseRoute = express.Router();

expenseRoute.post("/", authMiddleware,createExpense);
expenseRoute.get("/", authMiddleware, getAllExpense);
expenseRoute.get("/:id", authMiddleware, getExpenseDetail);
expenseRoute.put("/:id",  authMiddleware,updateExpense);
expenseRoute.delete("/:id",  authMiddleware,deleteExpense); //api/income/id
module.exports=expenseRoute;