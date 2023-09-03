import httpStatus from "http-status";
import {ApiError} from "../../../handleErrors/ApiError";
import {IBook, IBookFilters, Review} from "./book.interface";
import {Book} from "./book.model";
import {bookSearchableFields} from "./book.constant";
import {SortOrder} from "mongoose";
import {IGenericPaginationResponse, IPaginationOptions} from "../../../interfaces/pagination";
import {calculatePagination} from "../../../shared/paginationHelper";

//add book
export const addBookService = async (payload: IBook) => {
  const newBook = await Book.create(payload);
  if (!newBook) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create book!");
  }
  return newBook;
};
//get all books
export const getAllBooksService = async (filters: IBookFilters, paginationOptions: IPaginationOptions): Promise<IGenericPaginationResponse<IBook[]>> => {
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
      $or: bookSearchableFields.map((field) => ({
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
  const books = await Book.find(whereCondition).sort(sortConditions).skip(skip).limit(limit);
  const count = await Book.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      count,
    },
    data: books,
  };
};

//get a single book
export const getSingleBookService = async (id: string): Promise<IBook | null> => {
  const book = await Book.findById({_id: id});
  return book;
};
//update IBook
export const updateBookService = async (id: string, payload: Partial<IBook>): Promise<IBook | null> => {
  const isExist = await Book.findById({_id: id});
  console.log(id, payload);
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Book not found!");
  }

  const result = await Book.findOneAndUpdate({_id: id}, payload, {
    new: true,
  });
  return result;
};

//delete IBook
export const deleteBookService = async (id: string): Promise<IBook | null> => {
  const isExist = await Book.findById({_id: id});
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Book not found!");
  }
  const result = await Book.findByIdAndDelete(id);
  return result;
};

//add reviews
export const addReviewService = async (id: string, review: Review): Promise<IBook | null> => {
  const isExist = await Book.findById({_id: id});
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Book not found!");
  }

  const result = await Book.findOneAndUpdate(
    {_id: id},
    {$push: {reviews: review}},
    {
      new: true,
    }
  );
  return result;
};
