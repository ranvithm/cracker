import { z } from "zod";

const CustomerSchema = z.object({
    name: z.string().min(3, {
        message: "Customer Name must be at least 3 characters.",
    }),
    email: z.string().email({
        message: "Enter a valid email.",
    }),
    phone: z.string().min(10, {
        message: "Phone number must be at least 10 characters.",
    }),
    address: z.string().min(20, {
        message: "Address must be at least 20 characters.",
    }),
    city: z.string().min(3, {
        message: "City must be at least 3 characters.",
    }),
    state: z.string().min(3, {
        message: "State must be at least 3 characters.",
    }),
    country: z.string().min(3, {
        message: "Country must be at least 3 characters.",
    }),
    postalCode: z.string().min(6, {
        message: "Postal Code must be at least 6 characters.",
    }),
});


export default CustomerSchema;