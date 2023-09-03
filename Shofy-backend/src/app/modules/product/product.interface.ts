import {Model, Types} from "mongoose";
import {IUser} from "../user/user.interface";
export type Review = {
  review: number;
};
export type IProduct = {
  name: string;
  status: string;
  price: number;
  category: string;
  description: string;
  image?: string;
  review: Review[];
  addedBy: Types.ObjectId | IUser;
};
export type IProductFilters = {
  searchTerm?: string;
  category?: string;
};
export type ProductModel = Model<IProduct, Record<string, unknown>>;
