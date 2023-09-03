import express from "express";
import {validateRequest} from "../../middlewares/validateRequest";
import {createOrUpdateCart, getSingleCart} from "./cart.controller";

const router = express.Router();
//,

router.post(
  "/",

  createOrUpdateCart
);
router.get(
  "/:id",

  getSingleCart
);

//
export const CartRoutes = router;
