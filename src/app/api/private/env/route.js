import { ENV } from "@/app/gloabVariable";


export function GET (req) {

    console.log("env will send", ENV);
    
    return new Response(JSON.stringify(ENV))
}