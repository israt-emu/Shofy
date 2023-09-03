import express from "express";
import {auth} from "../../middlewares/auth";
import {getAllUsers, getSingleUser} from "./user.controller";

const router = express.Router();
const document = "user";
//

router.get("/:id", getSingleUser);

router.get("/", getAllUsers);
//
export const UserRoutes = router;
