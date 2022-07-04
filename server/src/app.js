const express = require('express');
const dotenv=require('dotenv')
const cors = require('cors')
const db = require("./config/db");
const { registerUser } = require('./controllers/users/users');
const { errorHandler,notFound } = require('./middlewares/error');
const userRoute = require('./routes/users/usersRoute');
const incomeRoute = require('./routes/income/incomeRoute');
const expenseRoute = require('./routes/expenses/expenseRoute');
const accountStatsRoute = require('./routes/accountStatsRoute/accountStatsRoute');


const app= express();

//.env
dotenv.config()
//db connect
db();
//middleware
app.use(express.json());

//home page
app.use(cors());

app.get("/",(req,res)=>{
    res.json({msg:"Welcome to Expenses tracker"})
})

//users routes
app.use('/api/users',userRoute);
//account stats
app.use("/",accountStatsRoute);

//income route
app.use('/api/income',incomeRoute);

//expense routes
app.use('/api/expenses',expenseRoute);

//Error (middleware)
app.use(notFound);
app.use(errorHandler);



module.exports=app;

