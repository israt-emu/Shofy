import {Model, Types} from "mongoose";
import {IUser} from "../user/user.interface";
export type Review = {
  review: number;
};
export type IProduct = {
  name: string;
  status: "In Stock" | "Out of Stock";
  price: number;
  sku: string;
  size: number;
  subCategory: string;
  color: string;
  category: string;
  description: string;
  image?: string;
  rating: number[];
  weight: string;
  dimension: string;
  version: string[];
  quantity: number;
  addedBy: Types.ObjectId | IUser;
};
export type IProductFilters = {
  searchTerm?: string;
  category?: string;
};
export type ProductModel = Model<IProduct, Record<string, unknown>>;
