import { Schema, model } from "mongoose";

const loginSchema = new Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Please fill a valid email address"],
  },
  password: { type: String, required: true }, 
  userType: { type: String, default: "user", required: true },
});

const Login = model("LoginUser", loginSchema);
export { Login };
