import httpStatus from "http-status";
import {ApiError} from "../../../handleErrors/ApiError";
import {IWishList} from "./wishlist.interface";
import {WishList} from "./wishlist.model";

//add wishlist
export const addWishListService = async (payload: IWishList) => {
  const {user, book} = payload;
  const isExist = await WishList.findOne({user, book});
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Already added this book to wishlist!");
  }
  const newWishList = await WishList.create(payload);
  if (!newWishList) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create list!");
  }
  return newWishList;
};
//get all lists
export const getAllWishListService = async (userId: string): Promise<IWishList[]> => {
  const lists = await WishList.find({user: userId}).populate("user").populate("book");
  return lists;
};
