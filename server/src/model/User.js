const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Firs tname is required..."],
    },
    lastname: {
      type: String,
      required: [true, "Last name is required..."],
    },
    email: {
      type: String,
      required: [true, "Email is required..."],
    },
    password: {
      type: String,
      required: [true, "Password is required..."],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    createdAt:{
      type:Date,
      default:Date.now(),
    }
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

//virtual
userSchema.virtual("expenses", {
  ref: "Expense",
  foreignField: "user",
  localField: "_id",
});

userSchema.virtual("income", {
    ref: "Income",
    foreignField: "user",
    localField: "_id",
  });

//hash password

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//verify password
userSchema.methods.isPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
