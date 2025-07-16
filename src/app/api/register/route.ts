import { prisma } from "@/lib/prisma";
import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken"
interface RegisterBody {
    email: string;
    password: string;
    username : string;
}
export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as RegisterBody;

        if (!body) return NextResponse.json({
            message: "Body inVaild"
        })
        if (!body.email || !body.password || !body.username) return NextResponse.json({
            message: "Please enter email and password"
        })
        const hasPassword = createHash('sha256').update(body.password).digest('hex')
        console.log(hasPassword)
        const user = await prisma.user.findFirst({
            where: {
                email: body.email.toLowerCase()
            }
        })

        if (user) return NextResponse.json({
            message: "user is Already"
        })

        const newData = await prisma.user.create({
                data : {
                    email : body.email.toLowerCase(),
                    password : hasPassword,
                    username : body.username,
               
            }
        })
            
        return NextResponse.json({
            status : "Success",
        })

    } catch (err) {
        console.log(err)
        return NextResponse.json({
            message : `Error ${err}`
        })
    }
}