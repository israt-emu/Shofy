import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "@/components/home/Home";
import Products from "@/pages/Products";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import ProductManage from "@/pages/ProductManage";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";
import AddProduct from "@/pages/AddProduct";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "/dashboard/seller",
        element: <Dashboard />,
      },

      {
        path: "/dashboard/manage",
        element: <ProductManage />,
      },
      {
        path: "/dashboard/addProduct",
        element: <AddProduct />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
