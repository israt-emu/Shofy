import httpStatus from "http-status";
import {catchAsync} from "../../../shared/catchAsync";
import {sendResponse} from "../../../shared/sendResponse";
import {addBookService, addReviewService, deleteBookService, getAllBooksService, getSingleBookService, updateBookService} from "./book.service";
import {IBook} from "./book.interface";
import {Request, Response} from "express";
import {pick} from "../../../shared/pick";
import {bookFilterableFields} from "./book.constant";
import {paginationFields} from "../../../constant/pagination";

export const createBook = catchAsync(async (req: Request, res: Response) => {
  const book = req.body;

  const newBook = await addBookService(book);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book created successfully!",
    data: newBook,
  });
});
//get all books
export const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const books = await getAllBooksService(filters, paginationOptions);
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book retrieved successfully!",
    meta: books.meta,
    data: books.data,
  });
});
//get a single book
export const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const book = await getSingleBookService(id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "book retrieved successfully!",
    data: book,
  });
});
//update book
export const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req?.body;
  const updatedBook = await updateBookService(id, updatedData);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book updated successfully!",
    data: updatedBook,
  });
});
//delete book
export const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const book = await deleteBookService(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book deleted successfully!",
    data: book,
  });
});
//add reviews
export const addReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const review = req?.body;
  const updatedBook = await addReviewService(id, review);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review added successfully!",
    data: updatedBook,
  });
});
