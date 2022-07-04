const mongoose= require("mongoose");

const db = async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URL) ;
       console.log("successfully connected to db")
    } catch (error) {
        console.log(error)
    }
}

module.exports= db;