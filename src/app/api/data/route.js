import fs from "fs"
export async function POST(req) {
  console.log("in the club");
  
    try {
      const body = await req.json(); // Parse JSON from request body
  
      console.log(body);
  console.log("this is the body");
      

      const data = [...JSON.parse(fs.readFileSync("data.json").toString())]

      data.push(body.data[0])

      console.log("this hsould be the file", data);
      
      fs.writeFileSync("data.json", JSON.stringify(data))

      return Response.json({ success: true, });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
    }
  }
  