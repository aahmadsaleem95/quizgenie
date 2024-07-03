import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, fullname, gender,dob} = req.body;
  if (
    [username, email, password, fullname, gender].some((field) =>
    field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (!dob || isNaN(new Date(dob).getTime())) {
    throw new ApiError(400, "Invalid date of birth");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  const user = await User.create({
    username,
    email,
    password,
    fullname,
    gender,
    dob,
  });

//   const createdUser = await User.findById(user._id).select("-password");

//   if (!createdUser) {
//     throw new ApiError(500, "Something went wrong while registering the user");
//   }
  return res
    .status(201)
    .json(new ApiResponse(200, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req,res) => {
    const { email, username, password } = req.body;
    if (!username && !email) {
      throw new ApiError(400, "username or email is required");
    }
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });
    console.log("uer>>>>>>>>>>" ,user)
    if (!user) {
      throw new ApiError(404, "User does not exist");
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }
     const loggedInUser = await User.findById(user._id).select(
       "-password"
     );

     return res
       .status(200)
       .json(
         new ApiResponse(
           200,
           {
             loggedInUser,
           },
           "User logged In Successfully"
         )
       );

})

export { registerUser, loginUser };