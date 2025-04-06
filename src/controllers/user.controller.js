import { asynchandler } from "../utils/asynchandler.js";
import { apiError} from "../utils/apiError.js"
import { User } from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const registerUser= asynchandler(  async (req,res)=>{
  const {fullName,email,username,password}=  req.body
  console.log("email",email);

if(
    [fullName,email,username,password].some((field)=>
      field?.trim()===""
)
){
    throw new apiError(400,"all fields are required ")
}

 const existedUser=  User.findOne({
    $or:[{username},{email}]
})
if(existedUser){
    throw new apiError(409,"user with this email and username already exists")
}

  const avatarLocalPath=req.files?.avatar[0]?.path;
  const coverImageLocalPath=  req.files?.coverImage[0]?.path;
})

if(!avatarLocalPath){
throw new apiError(400,"Avatar is required")
}

const avatar= await uploadOnCloudinary(avatarLocalPath)
const coverImage= await uploadOnCloudinary(coverImageLocalPath)

export {registerUser}


// get user detail from frontend
// vaidation - not empty
// check if the user is already exists 
// check for the images, check for the avatar
// uploadOnCloudinary ,avatar
// cretae user Object- create entry in Db
// remove password and refresh token frmm response
// check for user creation
// return response.