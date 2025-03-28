import { Request, Response } from "express";
import prisma from "../../db";
import { BookingStatus, SeatStatus } from "@prisma/client";

const cancelSeat=async (req:Request,res:Response)=>{
    try{    
        const {seatId,bookingId}=req.body;
        // @ts-ignore
        const userId=req.user;

        const seat=await prisma.seat.update({where:{id:seatId},data:{
            seatStatus:SeatStatus.EMPTY
        }});

        const booking=await prisma.booking.update({
            where:{
                id:bookingId
            },
            data:{
                status:BookingStatus.CANCELED
            }
        })

        res.send("book seat successfully")
    }catch(e){
        res.send("something went wrong")
    }



}


export default cancelSeat;