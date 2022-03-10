import mongoose from "mongoose";
import validator from "validator";
import bycript from "bcryptjs";

interface UserSchema {
  name: string;
  email: string;
  password: string;
  role: string;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [20, "Name must be at most 20 characters"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    validate: {
      validator: validator.isEmail,
      message: "Email is invalid",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    // maxlength: 12,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  console.log("pre save");
  const salt = await bycript.genSalt(10);
  this.password = await bycript.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (
  password: UserSchema["password"]
) {
  const isMatch = await bycript.compare(password, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
