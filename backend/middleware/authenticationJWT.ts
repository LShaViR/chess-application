import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";
const authenticationUserJWT=(req:Request,res:Response,next:NextFunction)=>{
    try{const {token}=req.cookies;
    if(!token){
        res.send("token not found");
        return ;
    }
    const decoded=jwt.verify(token,jwtSecret);
    if(decoded){
        // @ts-ignore: Unreachable code error
        req.user=decoded.id ;
        next()
    }
    else{
        res.send("wrong password")
    }
    }catch(e){
        res.send("something went wrong")
    }

}

export {authenticationUserJWT};