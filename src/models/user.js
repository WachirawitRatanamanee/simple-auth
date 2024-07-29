import mongoose from "mongoose";

const User = mongoose.Schema({
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

export default mongoose.models.User || mongoose.model("User", User);
