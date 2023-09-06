import {Schema, Types, model} from "mongoose";
import {IOrder, OrderModel} from "./order.interface";

const OrderSchema = new Schema<IOrder, OrderModel>(
  {
    total_amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["BDT"],
      default: "BDT",
    },
    payment: {
      type: String,
      enum: ["pending", "complete"],
      default: "pending",
    },
    tran_id: {
      type: String,
      required: true,
    },
    shipping_method: {
      type: String,
      required: true,
    },
    cus_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    cus_add: {
      type: String,
      required: true,
    },
    cus_city: {
      type: String,
      required: true,
    },
    cus_postcode: {
      type: String,
      required: true,
    },
    cus_country: {
      type: String,
      required: true,
    },
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
  },
  {
    timestamps: true,
  }
);
//create model
export const Order = model<IOrder, OrderModel>("Order", OrderSchema);
