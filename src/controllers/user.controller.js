import { asynchandler } from "../utils/asynchandler.js";
import { ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { checkPrime } from "crypto";

const registerUser= asynchandler(  async (req,res)=>{
  const {fullName,email,username,password}=  req.body
  console.log("email",email);

if(
    [fullName,email,username,password].some((field)=>
      field?.trim()===""
)
){
    throw new ApiError(400,"all fields are required ")
}

 const existedUser= await User.findOne({
    $or:[{username},{email}]
})
if(existedUser){
    throw new ApiError(409,"user with this email and username already exists")
}

// console.log(req.files)


  const avatarLocalPath=req.files?.avatar[0]?.path;
//   const coverImageLocalPath=  req.files?.coverImage[0]?.path;

let coverImageLocalPath;
if (req.files && Array.isArray(req.files.coverImage.length>0)) {
    coverImageLocalPath=req.files.coverImage[0].path
}



if(!avatarLocalPath){
throw new ApiError(400,"Avatar is required")
}

const avatar= await uploadOnCloudinary(avatarLocalPath)
const coverImage= await uploadOnCloudinary(coverImageLocalPath)

if(!avatar){
    throw new ApiError(400,"Avatar is required") 
}


const user= await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url||"",
    email,
    password,
    username:username.toLowerCase()
})

const createdUser=await User.findById(user._id).select("-password -refreshToken")

if(!createdUser){
    throw new ApiError(500,"Something went Wrong while registering the user")
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"user registered successfully")
)

})


const loginUser=asynchandler(async(req,res)=>{
     
    const {username,email,password}=req.body

    if (!username||!email){
        throw new ApiError(400,"email and username is requires")
    }

const user= await User.findOne({
    $or:[{username,email}]
})
if(!user){
    throw new ApiError(404,"user not existed")
}

const isPasswordValid=await user.isPasswordCorrect(password)

if(!isPasswordValid){
    throw new ApiError(401,"Invaid user creadentials")
}

})

export {registerUser,
    loginUser
}















       // steps for loginUser
// req.body=>data
// username or email
// find the user
// password check
// acess and refresh token
// send cookie



   //steps for regiister user 
// get user detail from frontend
// vaidation - not empty
// check if the user is already exists 
// check for the images, check for the avatar
// uploadOnCloudinary ,avatar
// cretae user Object- create entry in Db
// remove password and refresh token frmm response
// check for user creation
// return response.