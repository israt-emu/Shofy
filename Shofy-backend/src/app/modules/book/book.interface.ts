import {Model, Types} from "mongoose";
import {IUser} from "../user/user.interface";
export type Review = {
  user: Types.ObjectId | IUser;
  review: string;
};
export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationYear: string;
  reviews: Review[];
  image?: string;
  addedBy: Types.ObjectId | IUser;
};
export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: string;
};
export type BookModel = Model<IBook, Record<string, unknown>>;
