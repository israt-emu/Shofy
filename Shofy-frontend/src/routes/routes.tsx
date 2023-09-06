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
import EditProduct from "@/pages/EditProduct";
import PrivateRoute from "./PrivateRoute";
import Checkout from "@/pages/Checkout";
import Orders from "@/pages/Orders";

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
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/seller",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard/manage",
        element: (
          <PrivateRoute>
            <ProductManage />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/addProduct",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/editProduct/:editId",
        element: (
          <PrivateRoute>
            <EditProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        ),
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
