"use server";
import { prisma } from "@/src/lib/db";

export const addCustomer = async (customer: any) => {
  return await prisma.customer.create({ data: customer });
};

export const getAllCustomers = async () => {
  return await prisma.customer.findMany();
};
