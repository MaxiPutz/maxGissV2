import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { ENV } from "../../gloabVariable"


const prisma = new PrismaClient()
const key = ENV.SECRET_KEY
/**
 * 
 * @param {NextRequest<RegisterType>} req 
 */
export async function POST (req) {


    /**
     *@type {RegisterType}  
     */
    const data = await req.json()
    
    const user = await prisma.user.findUnique({where: {email: data.email}})

    console.log(user);
    
    if (!user) {
        return new Response(JSON.stringify( {error: "User not found"}, {status: 400}));
    }

    const isPwCorrect = await bcrypt.compare(data.password, user.password)


    console.log(data);
    
    if (!isPwCorrect) {
        return new Response(JSON.stringify( {error: "PW incorrect"}, {status: 400}));
    }

    return new Response(JSON.stringify( {token: jwt.sign(
            { email: user.email,  }, 
            key, 
            { expiresIn: "1h" } 
        )
    }))


}
   