import httpStatus from "http-status";
import {ApiError} from "../../../handleErrors/ApiError";
import {productSearchableFields} from "./product.constant";
import {SortOrder} from "mongoose";
import {IGenericPaginationResponse, IPaginationOptions} from "../../../interfaces/pagination";
import {calculatePagination} from "../../../shared/paginationHelper";
import {IProduct, IProductFilters, Review} from "./product.interface";
import {Product} from "./product.model";

//add Product
export const addProductService = async (payload: IProduct) => {
  const {rating, version, ...others} = payload;
  const data = {
    ...others,
    rating: [rating],
    version: [version],
  };
  const newProduct = await Product.create(data);
  if (!newProduct) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create product!");
  }
  return newProduct;
};
//get all Products
export const getAllProductsService = async (filters: IProductFilters, paginationOptions: IPaginationOptions): Promise<IGenericPaginationResponse<IProduct[]>> => {
  //pagination
  const {page, limit, skip, sortBy, sortOrder} = calculatePagination(paginationOptions);
  const sortConditions: {[key: string]: SortOrder} = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  //search
  const {searchTerm, ...filtersData} = filters;
  const andconditions = [];
  if (searchTerm) {
    andconditions.push({
      $or: productSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  //filtering
  if (Object.keys(filtersData).length > 0) {
    andconditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        return {[field]: value};
      }),
    });
  }
  const whereCondition = andconditions?.length > 0 ? {$and: andconditions} : {};
  const products = await Product.find(whereCondition).sort(sortConditions).skip(skip);
  const count = await Product.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      count,
    },
    data: products,
  };
};

//get a single Product
export const getSingleProductService = async (id: string): Promise<IProduct | null> => {
  const product = await Product.findById({_id: id});
  return product;
};
//update Product
export const updateProductService = async (id: string, payload: Partial<IProduct>): Promise<IProduct | null> => {
  const isExist = await Product.findById({_id: id});
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Product not found!");
  }

  const result = await Product.findOneAndUpdate({_id: id}, payload, {
    new: true,
  });
  return result;
};

//delete Product
export const deleteProductService = async (id: string): Promise<IProduct | null> => {
  const isExist = await Product.findById({_id: id});
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Product not found!");
  }
  const result = await Product.findByIdAndDelete(id);
  return result;
};

//add reviews
export const addReviewService = async (id: string, review: Review): Promise<IProduct | null> => {
  const isExist = await Product.findById({_id: id});
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Product not found!");
  }

  const result = await Product.findOneAndUpdate(
    {_id: id},
    {$push: {reviews: review}},
    {
      new: true,
    }
  );
  return result;
};
