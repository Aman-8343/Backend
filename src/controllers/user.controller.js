import { asynchandler } from "../utils/asynchandler.js";
import { apiError} from "../utils/apiError.js"
import { User } from "../models/user.models.js";

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

})


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