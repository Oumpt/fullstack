import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try{
      const data = await prisma.products.findMany()
      return NextResponse.json({
            data: data
      })
  }  catch (error){
      console.error(error);
      return NextResponse.json({
        message: "Error"
      })
  }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        await prisma.products.delete({ where: { id: body.id } });
        return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error deleting product" }, { status: 500 });
    }
}