import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(3, {
    message: "ProductName must be at least 3 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  price: z.number().positive({
    message: "Price must be a positive number.",
  }),
  category: z.string().min(3, {
    message: "Category must be at least 3 characters.",
  }),
  images: z.array(z.string()).min(1, {
    message: "At least one image is required.",
  }),
});


export default ProductSchema;