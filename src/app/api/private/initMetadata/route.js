import fs from "fs"

export function GET(req) {

    const data = fs.readFileSync("./tmp/metaDatav3.zip")

    return new Response(data, {
        headers: {
            "Content-Type": "application/zip",
            "Content-Disposition": "attachment; filename=metaDatav3.zip",
        },
    })
}