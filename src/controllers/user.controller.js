import { asynchandler } from "../utils/asynchandler.js";


const registerUser= asynchandler(  async (req,res)=>{
  const {fullName,email,username,password}=  req.body
  console.log("email",email)
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