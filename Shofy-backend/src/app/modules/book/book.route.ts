import express from "express";
import {addReview, createBook, deleteBook, getAllBooks, getSingleBook, updateBook} from "./book.controller";
import {auth} from "../../middlewares/auth";
import {ENUM_USER_ROLE} from "../../../enums/user";
import {validateRequest} from "../../middlewares/validateRequest";
import {createBookZodSchema, updateBookZodSchema} from "./book.validation";

const router = express.Router();
const document = "book";
//,

router.post(
  "/",
  validateRequest(createBookZodSchema),
  //  auth(document, ENUM_USER_ROLE.USER),
  createBook
);
router.get(
  "/:id",
  //   auth(document,ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  getSingleBook
);
router.delete(
  "/:id",
  //  auth(document, ENUM_USER_ROLE.USER),
  deleteBook
);
router.patch(
  "/:id",
  validateRequest(updateBookZodSchema),
  //auth(document, ENUM_USER_ROLE.USER),
  updateBook
);
router.patch(
  "/addReview/:id",
  validateRequest(updateBookZodSchema),
  //auth(document, ENUM_USER_ROLE.USER),
  addReview
);
router.get(
  "/",
  // auth(document, ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  getAllBooks
);
//
export const BookRoutes = router;
