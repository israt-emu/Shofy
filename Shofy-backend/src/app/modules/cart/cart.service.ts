import httpStatus from "http-status";
import {ApiError} from "../../../handleErrors/ApiError";
import {CartProduct, ICart} from "./cart.interface";
import {Cart} from "./cart.model";
import {IProduct} from "../product/product.interface";

//add cart or update
export const addORUpdateCartService = async (payload: {product: CartProduct; user: string}): Promise<ICart> => {
  const existingCart = await Cart.findOne({user: payload.user});
  if (!existingCart) {
    const data = {
      products: [payload.product],
      user: payload.user,
    };
    const newCart = await Cart.create(data);
    if (!newCart) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create cart!");
    }
    return newCart;
  } else {
    existingCart.products.push(payload.product);
    await existingCart.save();
    return existingCart;
  }
};
export const getSingleCartService = async (user: string): Promise<ICart | null> => {
  const cart = await Cart.findOne({user});
  return cart;
};
