const mongoose = require("mongoose");
const zod = require("zod");
mongoose.connect("", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const userZodSchema = zod.object({
  username: zod.string().min(6).max(50).trim(),
  password: zod.string().min(6).max(50).trim(),
  firstname: zod.string().min(2).max(50).trim(),
  lastname: zod.string().min(2).max(50).trim()
});
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 6, maxlength: 50, trim: true },
  password: { type: String, required: true, minlength: 6, maxlength: 50, trim: true },
  firstname: { type: String, required: true, minlength: 2, maxlength: 50, trim: true },
  lastname: { type: String, required: true, minlength: 2, maxlength: 50, trim: true }
});
const accountSchema=new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  balance:{
    type:Number,
    required:true
  }
})
const User = mongoose.model("User", userSchema);
const Account=mongoose.model("Account",accountSchema);
module.exports = {
  User,
  userZodSchema,
  Account
};
