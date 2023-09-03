import express from "express";

import {auth} from "../../middlewares/auth";
import {ENUM_USER_ROLE} from "../../../enums/user";
import {validateRequest} from "../../middlewares/validateRequest";
import {createProductZodSchema, updateProductZodSchema} from "./product.validation";
import {addReview, createProduct, deleteProduct, getAllProduct, getSingleProduct, updateProduct} from "./product.controller";

const router = express.Router();
const document = "product";
//,

router.post("/", validateRequest(createProductZodSchema), createProduct);
router.get("/:id", getSingleProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", validateRequest(updateProductZodSchema), updateProduct);
router.patch(
  "/addReview/:id",
  validateRequest(updateProductZodSchema),

  addReview
);
router.get("/", getAllProduct);
//
export const ProductRoutes = router;
