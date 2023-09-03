import {z} from "zod";

export const createUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Phone Number is required",
    }),

    name: z.string({
      required_error: "Name is required",
    }),
    password: z.string().optional(),
    
  }),
});

