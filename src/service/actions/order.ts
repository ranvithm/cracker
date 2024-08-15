"use server";
import { prisma } from "@/src/lib/db";

export const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      Customer: true,
      products: {
        include: {
          Order: true,
        },
      },
    },
  });
};
export const getOrder = async (id: string) => {
  return await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      Customer: true,
      products: {
        include: {
          Order: true,
        },
      },
    },
  });
};
