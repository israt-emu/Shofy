import express from "express";
import {createOrder, getAllOrder, getSingleOrder} from "./order.controller";
const router = express.Router();

//,

router.post("/", createOrder);
router.get("/allorder/:id", getAllOrder);
router.get("/:id", getSingleOrder);
//
export const OrderRoutes = router;
