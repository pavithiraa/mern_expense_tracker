const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')


const expenseSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true,'Title is required...']
    },
    description:{
        type: String,
        required: [true,'Description is required...']
    },
    type:{
        type: String,
        default:"expense",
    },
    amount:{
        type: Number,
        required: [true,'Amount is required...']
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,//must be mongodb id
        ref:"User",
        required:[true,"User ID is required"]
    }
},{timestamps:true,
   toJSON:{
       virtuals:true,
   },
   toObject:{
    virtuals:true,
   }
}
);

//pagination
expenseSchema.plugin(mongoosePaginate)

const Expense = mongoose.model("Expense",expenseSchema);
module.exports= Expense;