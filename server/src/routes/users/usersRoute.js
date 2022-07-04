const express = require("express");
const { registerUser,getUsers ,loginUser, userProfileCtrl, updateUserCtrl} = require("../../controllers/users/users");
const authMiddleware = require("../../middlewares/authMiddleware");

const userRoute = express.Router();

userRoute.post('/register',registerUser)

userRoute.post('/login',loginUser)
userRoute.get('/',authMiddleware,getUsers)
userRoute.get("/profile", authMiddleware, userProfileCtrl);
userRoute.put("/update", authMiddleware, updateUserCtrl);

module.exports=userRoute;