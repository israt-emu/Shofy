import express from "express";
import {validateRequest} from "../../middlewares/validateRequest";
import {createOrUpdateCart, deleteProductFromCart, getSingleCart, handleQuantity} from "./cart.controller";

const router = express.Router();
//,

router.post(
  "/",

  createOrUpdateCart
);
router.post(
  "/deleteProduct",

  deleteProductFromCart
);
router.post(
  "/handleQuantity",

  handleQuantity
);
router.get(
  "/:id",

  getSingleCart
);

//
export const CartRoutes = router;
