import {Request, Response} from "express";
import {catchAsync} from "../../../shared/catchAsync";
import {addOrderService, getAllorderService, getSingleorderService, updateOrderService} from "./order.service";
import {sendResponse} from "../../../shared/sendResponse";
import {IOrder} from "./order.interface";
import httpStatus from "http-status";
//create order
export const createOrder = catchAsync(async (req: Request, res: Response) => {
  const {order, cartId} = req.body;

  const newOrder = await addOrderService(order, cartId);
  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order created successfully!",
    data: newOrder,
  });
});
//get a single order
export const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const order = await getSingleorderService(id);
  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "order retrieved successfully!",
    data: order,
  });
});
//get all order
export const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const orders = await getAllorderService(id);
  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "orders retrieved successfully!",
    data: orders,
  });
});
//update order
export const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const tran_id = req?.body?.tran._id;
  const order = await updateOrderService(tran_id);
  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment updated successfully!",
    data: order,
  });
});
