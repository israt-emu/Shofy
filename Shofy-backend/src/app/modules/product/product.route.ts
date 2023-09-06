import express from "express";
import {validateRequest} from "../../middlewares/validateRequest";
import {createProductZodSchema, updateProductZodSchema} from "./product.validation";
import {addReview, createProduct, deleteProduct, getAllProduct, getSingleProduct, updateProduct} from "./product.controller";

const router = express.Router();

//,

router.post("/", createProduct);
router.get("/:id", getSingleProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", updateProduct);
router.get("/", getAllProduct);
//
export const ProductRoutes = router;
