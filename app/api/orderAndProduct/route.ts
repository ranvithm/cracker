import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const body = await req.json();
  if (!body) {
    return NextResponse.error();
  }

  const orders = await prisma.orderAndProduct.create({
    data: {
      orderId: body.orderId,
      productId: body.productId,
      quantity: body.quantity,
    },
  });
  return NextResponse.json(orders);
};
