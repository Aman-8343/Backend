import { asynchandler } from "../utils/asynchandler";

export const verifyJWT=asynchandler(async(req,res,next)=>{
    req.cookies?.accessToken||req.header("Authorization")
})