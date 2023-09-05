import httpStatus from "http-status";
import {ApiError} from "../../../handleErrors/ApiError";
import {CartProduct, ICart} from "./cart.interface";
import {Cart} from "./cart.model";

//add cart or update
export const addORUpdateCartService = async (payload: {product: CartProduct; user: string}): Promise<ICart | null> => {
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
    const productExist = existingCart.products?.find((product) => product.productId.toString() === payload.product.productId.toString());
    if (productExist) {
      const newQuantity = productExist.quantity + payload.product.quantity;
      const result = await Cart.findOneAndUpdate(
        {
          user: payload.user,
          "products.productId": payload.product.productId,
        },
        {
          $set: {"products.$.quantity": newQuantity},
        },
        {new: true}
      );
      return result;
    } else {
      existingCart.products.push(payload.product);
      await existingCart.save();
      return existingCart;
    }
  }
};
//get cart
export const getSingleCartService = async (user: string): Promise<ICart | null> => {
  const cart = await Cart.findOne({user});
  return cart;
};
//product delete from cart
export const deleteProductFromCartService = async (user: string, productId: string): Promise<ICart | null> => {
  const cart = await Cart.findOneAndUpdate(
    {user},
    {
      $pull: {products: {productId}},
    },
    {new: true}
  );
  return cart;
};
//increase or decrease product quantity from cart

export const handleQuantityService = async (user: string, productId: string, operation: string): Promise<ICart | null | undefined> => {
  if (operation === "plus") {
    const cart = await Cart.findOneAndUpdate(
      {user, "products.productId": productId},

      {
        $inc: {"products.$.quantity": 1},
      },
      {new: true}
    );
    return cart;
  } else {
    const cart = await Cart.findOneAndUpdate({user, "products.productId": productId}, {$inc: {"products.$.quantity": -1}}, {new: true});
    return cart;
  }
};
