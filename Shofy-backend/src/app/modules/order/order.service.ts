import httpStatus from "http-status";
import {ApiError} from "../../../handleErrors/ApiError";
import {IOrder} from "./order.interface";
import {Order} from "./order.model";
import {Cart} from "../cart/cart.model";
import {v4 as uuidv4} from "uuid";
import config from "../../../config";
const SSLCommerzPayment = require("sslcommerz");
//add order
export const addOrderService = async (payload: IOrder, cartId: string) => {
  const tran_id = uuidv4();
  const newOrder = await Order.create({...payload, tran_id: tran_id});
  if (!newOrder) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to place order!");
  } else {
    const deleteCart = await Cart.deleteOne({_id: cartId});
  }

  return newOrder;
};
//update order
export const updateOrderService = async (tran_id: string): Promise<IOrder | null> => {
  const order = await Order.findOneAndUpdate({tran_id: tran_id}, {payment: "complete"}, {new: true});

  return order;
};
//get a single order
export const getSingleorderService = async (id: string): Promise<IOrder | null> => {
  const order = await Order.findById({_id: id});
  return order;
};
//get all order
export const getAllorderService = async (id: string): Promise<IOrder[]> => {
  console.log(id);
  const order = await Order.find({cus_id: id});
  return order;
};
//make payment
