import {Schema, model} from "mongoose";
import {CartModel, ICart} from "./cart.interface";

const CartSchema = new Schema<ICart, CartModel>(
  {
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
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
        name: {
          type: String,
          required: true,
        },
      },
    ],

    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//create model
export const Cart = model<ICart, CartModel>("Cart", CartSchema);
