const expressAsyncHandler = require("express-async-handler");
const Income = require("../../model/Income");

//create
const createIncome = expressAsyncHandler(async (req, res) => {
  const { title, amount, description } = req.body;
  try {
    const newIncome = new Income({ title, amount, description, user:req?.user?._id });
    const income = await newIncome.save();
    res.json(income);
  } catch (err) {
    res.json(err);
  }
});

//getallIncome
const getAllIncome = expressAsyncHandler(async (req, res) => {
  // console.log(req?.user)
  const { page } = req?.query;
  try {
    const newIncome = await Income.
    paginate(
      {},
      { limit: 7, page: Number(page), populate: "user" }
    );
    res.json(newIncome);
  } catch (err) {
    res.json(err);
  }
});

//get single Income
const getIncomeDetail = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;

  try {
    const newIncome = await Income.findById(id);
    res.json(newIncome);
  } catch (err) {
    res.json(err);
  }
});

//update
const updateIncome = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { title, amount, description } = req.body;
  try {
    const income = await Income.findByIdAndUpdate(
      id,
      {
        title,
        amount,
        description,
      },
      { new: true }
    );
    res.json(income);
  } catch (err) {
    res.json(err);
  }
});

//delete income
const deleteIncome = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;

  try {
    const newIncome = await Income.findByIdAndDelete(id);
    res.json(newIncome);
  } catch (err) {
    res.json(err);
  }
});

module.exports = {
  createIncome,
  getAllIncome,
  getIncomeDetail,
  updateIncome,
  deleteIncome,
};
