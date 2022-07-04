const expressAsyncHandler = require("express-async-handler");
const Expense = require("../../model/Expense");


//create
const createExpense= expressAsyncHandler(async(req,res)=>{
    const {title,amount,description}=req.body
    try{
        const newExpense= new Expense({
            title,
            amount,
            description,
            user:req?.user?._id
        });
        const expense = await newExpense.save()
        res.json(expense)
    }catch(err){
        res.json(err)
    }
})


//getallIncome
const getAllExpense= expressAsyncHandler(async(req,res)=>{
    const {page} =req?.query
    try{
        const newExpense= await Expense.paginate({},{limit:7,page:Number(page),populate:"user"});
        res.json(newExpense)
    }catch(err){
        res.json(err)
    }
})

//get single Income
const getExpenseDetail= expressAsyncHandler(async(req,res)=>{
const {id} = req?.params;

    try{
        const newExpense= await Expense.findById(id);
        res.json(newExpense)
    }catch(err){
        res.json(err)
    }
})

//update
const updateExpense=expressAsyncHandler(async(req,res)=>{
    const {id} = req?.params;
    const {title,amount,description}=req.body;
    try{
     const expense = await Expense.findByIdAndUpdate(id,
        {
            title,
            amount,
            description
        },
        {new:true});
        res.json(expense);
    }catch(err){
         res.json(err)
    }
})

//delete income
const deleteExpense= expressAsyncHandler(async(req,res)=>{
    const {id} = req?.params;
    
        try{
            const newExpense= await Expense.findByIdAndDelete(id);
            res.json(newExpense)
        }catch(err){
            res.json(err)
        }
    })

module.exports={createExpense,getAllExpense,getExpenseDetail,updateExpense, deleteExpense}