const User = require("../../model/User");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../middlewares/generateToken");

//Register
const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, firstname, lastname, password } = req?.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("user already exist");
  }
  try {
    const newUser = new User({ email, firstname, lastname, password });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all users

const getUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json(err);
  }
});

//login

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  //Find the user in db
  const userFound = await User.findOne({ email });
  //check for password match
  if (userFound && (await userFound?.isPassword(password))) {
    return res.json({
      _id: userFound?._id,
      firstname: userFound?.firstname,
      lastname: userFound?.lastname,
      email: userFound?.email,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    });
  }
  res.status(401);
  throw new Error("Invalid Login Credentials");
});

//update profile
const updateUserCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const profile = await User.findByIdAndUpdate({_id:req?.user?._id},
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
      },
      {
        new: true,  
      }
    );
    res.json(profile);
  } catch (error) {
    res.json(error);
  }
});
//user profile
const userProfileCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const profile = await User.findById(req?.user?._id).populate([
      "expenses",
      "income",
    ]);
    res.json(profile);
  } catch (error) {
    res.json(error);
  }
});



module.exports = {
  registerUser,
  getUsers,
  loginUser,
  userProfileCtrl,
  updateUserCtrl,
};
