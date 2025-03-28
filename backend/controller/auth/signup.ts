import { Request, Response } from "express";
import { UserSchemaType } from "../../zod/types";
import { userSchema } from "../../zod/schema";
import prisma from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../config";

const signup=async (req:Request,res:Response)=>{
    try{
        const body= userSchema.safeParse(req.body);
        if(!body.success){
            res.send("wrong input")
            return ;
        }
        const {email, name, password}:UserSchemaType = body.data;

        const user = await prisma.user.findFirst({where:{email}})
        if(user){
            res.send("user already exist");
            return ;
        }

        const hashedPassword=await bcrypt.hash(password,10)


        const response = await prisma.user.create({
            data:{
                "name":name,
                "email":email,
                "password":hashedPassword
            }
        })

        const token=await jwt.sign({"id":response.id},jwtSecret)
        res.cookie("userToken",token);
        res.send("user registered successfully")

    }catch(error){
        res.send("something went wrong")
    }

}



export default signup;