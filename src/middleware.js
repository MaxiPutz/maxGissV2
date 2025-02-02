import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { ENV } from "./app/gloabVariable";

/**
 * 
 * @param {NextRequest} req 
 * @returns 
 */
export async function middleware(req) {
    console.log("middleware");
    

    const publicRoutes = ["/login", "/register"]

    if (publicRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.next()
    }

    const authHeader = req.headers.get("authorization")

    console.log(authHeader);
    const token = req.cookies.get("token")?.value;
    
    
    if (token) {
        try {
            const decoded = jwtVerify(token, new TextEncoder().encode( ENV.SECRET_KEY));
            
            console.log("JWT Verified(cookie):", (await decoded).payload);

            return NextResponse.next()
        } catch (error) {
            console.error("JWT Verification Failed:", error.message);
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }


    

    if (authHeader) {
        try {
            const token = authHeader.substring(7);
            console.log("token", token);
            
            const decoded = jwtVerify(token, new TextEncoder().encode( ENV.SECRET_KEY));
            
            console.log("JWT Verified(header):", (await decoded).payload);

            return NextResponse.next()
        } catch (error) {
            console.error("JWT Verification Failed:", error.message);
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }
   
    return NextResponse.redirect(new URL("/login", req.url))
}


export const config = {
    matcher: ["/private", "/api/private/:path*"], // Add protected routes
    runtime: "nodejs",
};