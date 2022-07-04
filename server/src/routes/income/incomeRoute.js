const express = require("express");
const { createIncome ,getAllIncome,getIncomeDetail,updateIncome, deleteIncome} = require("../../controllers/income/incomesCtrl");
const authMiddleware = require("../../middlewares/authMiddleware");


const incomeRoute = express.Router();

incomeRoute.post("/",authMiddleware, createIncome);
incomeRoute.get("/", authMiddleware,getAllIncome);
incomeRoute.get("/:id",authMiddleware, getIncomeDetail);
incomeRoute.put("/:id",authMiddleware, updateIncome);
incomeRoute.delete("/:id",authMiddleware, deleteIncome);
module.exports=incomeRoute;