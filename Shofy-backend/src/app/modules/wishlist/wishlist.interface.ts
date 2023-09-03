import {Model, Types} from "mongoose";
import {IUser} from "../user/user.interface";
import {IBook} from "../book/book.interface";

export type IWishList = {
  user: Types.ObjectId | IUser;
  book: Types.ObjectId | IBook;
};

export type WishListModel = Model<IWishList, Record<string, unknown>>;
