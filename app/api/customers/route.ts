import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export const GET = async () => {
  const customers = await prisma.customer.findMany();
  return NextResponse.json(customers);
};
