import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const body = await req.json();
  if (!body) {
    return NextResponse.error();
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.userId,
    },
  });
  if (!user) {
    return NextResponse.error();
  }
  const customer = await prisma.order.create({
    data: {
      userId: user.id,
      customerId: body.customerId,
      total: body.total,
    },
  });
  return NextResponse.json(customer);
};
