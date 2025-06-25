import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  try{
      const data = await prisma.products.findMany()
      return NextResponse.json({
            data: data
      })
  }  catch (error){
      return NextResponse.json({
        message: "Error"
      })
  }
}