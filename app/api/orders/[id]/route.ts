import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const customer = await prisma.order.findUnique({
    where: {
      id: params.id,
    },
    include: {
      Customer: true,
      products: {
        include: {
          Product: true,
        },
      },
    },
  });
  return NextResponse.json(customer);
};
