import httpStatus from "http-status";
import {catchAsync} from "../../../shared/catchAsync";
import {ICart} from "./cart.interface";
import {addORUpdateCartService, getSingleCartService} from "./cart.service";
import {sendResponse} from "../../../shared/sendResponse";
import {Request, Response} from "express";
//create or update cart
export const createOrUpdateCart = catchAsync(async (req: Request, res: Response) => {
  const cartData = req.body;

  const cart = await addORUpdateCartService(cartData);
  sendResponse<ICart>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart created successfully!",
    data: cart,
  });
});
//get a single cart
export const getSingleCart = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const cart = await getSingleCartService(id);
  sendResponse<ICart>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart retrieved successfully!",
    data: cart,
  });
});
