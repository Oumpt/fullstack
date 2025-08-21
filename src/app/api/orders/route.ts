import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        product: true, // ดึง product มาด้วย
      },
    });

    return NextResponse.json({ data: orders });
  } catch (err: any) {
    console.error("❌ Fetch orders error:", err);
    return NextResponse.json(
      { error: "Failed to fetch orders", details: err.message },
      { status: 500 }
    );
  }
}
