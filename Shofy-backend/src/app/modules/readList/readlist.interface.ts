import {Model, Types} from "mongoose";
import {IUser} from "../user/user.interface";
import {IBook} from "../book/book.interface";

export type IReadList = {
  user: Types.ObjectId | IUser;
  book: Types.ObjectId | IBook;
  status: "Reading" | "Plan to Read" | "Finished";
};

export type ReadListModel = Model<IReadList, Record<string, unknown>>;
