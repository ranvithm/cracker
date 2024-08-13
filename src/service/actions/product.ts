 "use server"
import { prisma } from "@/src/lib/db";

export const addProduct = async (product: any) => {    
 return await prisma.product.create({ data: product });
};

export const getAllProducts = async () => {    
 return await prisma.product.findMany();
};
