import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
  // create user schema with username and email

  {
    username: {
      type: String,
      required: [true, "Please provide a Username"],
    },
    email: {
      type: String,
      required: [true, "Please provide an Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide an Password"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
    forgotPasswordToken: {
      type: String,
      required: false,
    },
    favorites: {
      type: Array,
    },
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: String,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
