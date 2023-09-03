import {Schema, model} from "mongoose";
import {IWishList, WishListModel} from "./wishlist.interface";

const WishListSchema = new Schema<IWishList, WishListModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    book: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Book",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

//create model
export const WishList = model<IWishList, WishListModel>("WishList", WishListSchema);
