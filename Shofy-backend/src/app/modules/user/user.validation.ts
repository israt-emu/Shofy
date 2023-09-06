import {z} from "zod";

export const createUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }),
    name: z.object({
      firstName: z.string({
        required_error: "First Name is required",
      }),
      lastName: z.string({
        required_error: "Last Name is required",
      }),
    }),
    password: z.string({
      required_error: "Password is required",
    }),
    phoneNumber: z.string({
      required_error: "Phone Number is required",
    }),
    seller: z.boolean({
      required_error: "seller is required",
    }),
  }),
});
