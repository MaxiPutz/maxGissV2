import fs from "fs"

export function GET(req) {

    const data = fs.readFileSync("./tmp/metaDatav2.json").toString()

    return new Response(data)
}