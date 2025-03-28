import { Request, Response } from "express";
import prisma from "../../db";
import { SeatStatus } from "@prisma/client";

const bookSeat=async (req:Request,res:Response)=>{
    try{    const {seatId}=req.body;
        // @ts-ignore
        const userId=req.user;

        const seat=await prisma.seat.update({where:{id:seatId},data:{
            seatStatus:SeatStatus.OCCUPIED
        }});

        const booking=await prisma.booking.create({
            data:{
                seatId:seatId,
                userId:userId
            }
        })

        res.send("book seat successfully")
    }catch(e){
        res.send("something went wrong")
    }



}


export default bookSeat;