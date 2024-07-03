import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    dob: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Date of birth cannot be in the future",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
 this.password = await bcrypt.hash(this.password,10)
 next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema);
