import fs from "fs"

export function GET(req) {

    const data = fs.readFileSync("./tmp/metadata.json").toString()

    return new Response(data)
}