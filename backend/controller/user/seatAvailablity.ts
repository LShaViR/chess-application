import { Request, Response } from "express";
import prisma from "../../db";

const getSeatAvailablity=async (req:Request,res:Response)=>{
    try{
        const theatre=req.params;
        const seats=await prisma.seat.findMany({
            select: {
            seatNo:true,
            id:true,
            seatStatus:true
            },where:{
            theatreId:theatre
        }})
        res.json({seats:seats})
    }catch(e){
        res.send("somethingwent wrong")
    }
    
    
}


export default getSeatAvailablity;