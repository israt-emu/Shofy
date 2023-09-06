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
    quantity: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["In Stock", "Out of Stock"],
    },
    description: {
      type: String,
    },
    rating: [
      {
        type: Number,
      },
    ],
    image: {
      type: String,
    },
    dimension: {
      type: String,
    },
    version: [{type: String}],
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
