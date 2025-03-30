import { asynchandler } from "../utils/asynchandler";

const registerUser= asynchandler(  async (req,res)=>{
    res.status(200).json({
        message:"ok"
    })
})


export {registerUser}