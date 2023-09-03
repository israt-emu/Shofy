import httpStatus from "http-status";
import {catchAsync} from "../../../shared/catchAsync";
import {sendResponse} from "../../../shared/sendResponse";

import {Request, Response} from "express";
import {pick} from "../../../shared/pick";
import {paginationFields} from "../../../constant/pagination";
import {IProduct} from "./product.interface";
import {addProductService, addReviewService, deleteProductService, getAllProductsService, getSingleProductService, updateProductService} from "./product.service";
import {productFilterableFields} from "./product.constant";

export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const product = req.body;

  const newProduct = await addProductService(product);
  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully!",
    data: newProduct,
  });
});
//get all Product
export const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const products = await getAllProductsService(filters, paginationOptions);
  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrieved successfully!",
    meta: products.meta,
    data: products.data,
  });
});
//get a single product
export const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const product = await getSingleProductService(id);
  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrieved successfully!",
    data: product,
  });
});
//update product
export const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req?.body;
  const updatedProduct = await updateProductService(id, updatedData);
  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully!",
    data: updatedProduct,
  });
});
//delete product
export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const product = await deleteProductService(id);

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully!",
    data: product,
  });
});
//add reviews
export const addReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const review = req?.body;
  const result = await addReviewService(id, review);
  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review added successfully!",
    data: result,
  });
});
