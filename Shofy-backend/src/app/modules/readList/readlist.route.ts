import express from "express";
import {createReadList, getAllReadList, updateReadList} from "./readlist.controller";
const router = express.Router();
//
router.patch("/:id", updateReadList);
router.post("/", createReadList);
router.get("/:id", getAllReadList);
export const ReadListRoutes = router;
