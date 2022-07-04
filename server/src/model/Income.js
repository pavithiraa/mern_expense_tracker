const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')


const incomeSchema = mongoose.Schema({
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
        default:"income",
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
incomeSchema.plugin(mongoosePaginate)

const Income = mongoose.model("Income",incomeSchema);
module.exports= Income;