import express from "express";
import {AuthRoutes} from "../modules/auth/auth.route";
import {UserRoutes} from "../modules/user/user.route";
import {BookRoutes} from "../modules/book/book.route";
import {WishListRoutes} from "../modules/wishlist/wishlist.route";
import {ReadListRoutes} from "../modules/readList/readlist.route";

const router = express.Router();
//
const moduleRoutes = [
  {path: "/auth", route: AuthRoutes},
  {path: "/users", route: UserRoutes},
  {path: "/books", route: BookRoutes},
  {path: "/wish-list", route: WishListRoutes},
  {path: "/read-list", route: ReadListRoutes},
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
