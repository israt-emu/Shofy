import {Schema, model} from "mongoose";
import {IProduct, ProductModel} from "./product.interface";

const ProductSchema = new Schema<IProduct, ProductModel>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    review: [
      {
        review: {
          type: Number,
        },
      },
    ],
    image: {
      type: String,
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//create model
export const Product = model<IProduct, ProductModel>("Product", ProductSchema);
