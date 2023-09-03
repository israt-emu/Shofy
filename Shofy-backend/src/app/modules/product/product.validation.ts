import {z} from "zod";

export const createProductZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required",
    }),
    price: z.number({
      required_error: "Price is required",
    }),
    status: z.string({
      required_error: "status is required",
    }),
    category: z.string({
      required_error: "category is required",
    }),
    addedBy: z.string({
      required_error: "addedBy is required",
    }),
    description: z.string({}).optional(),
    reviews: z
      .object({
        review: z.number().optional(),
      })
      .optional(),
    image: z.string().optional(),
  }),
});
export const updateProductZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    status: z.string().optional(),
    price: z.number().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    reviews: z
      .object({
        review: z.number().optional(),
      })
      .optional(),
    image: z.string().optional(),
    addedBy: z.string().optional(),
  }),
});
