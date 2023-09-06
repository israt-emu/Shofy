import cors from "cors";
import express, {Application, NextFunction, Request, Response} from "express";
import httpStatus from "http-status";
import router from "./app/routes";
import {globalErrorHandler} from "./app/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
import config from "./config";
import {updateOrderService} from "./app/modules/order/order.service";
const SSLCommerzPayment = require("sslcommerz");

const app: Application = express();

//
app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//payment initialization api
app.post(
  "/api/v1/init",
  (
    req: Request,
    res: {
      json: any;
      redirect: (arg0: any) => void;
    }
  ) => {
    const payload = req.body;
    const data = {
      total_amount: payload.total_amount,
      currency: "BDT",
      tran_id: payload.tran_id,
      success_url: "https://shofy-backend-virid.vercel.app/success",
      fail_url: "https://shofy-backend-virid.vercel.app/failure",
      cancel_url: "https://shofy-backend-virid.vercel.app/cancel",
      ipn_url: "https://shofy-backend-virid.vercel.app/ipn",
      shipping_method: payload.shipping_method,
      product_name: "computer",
      product_category: "Electronic",
      product_profile: "general",
      product_image: "",
      cus_name: "emu",
      cus_email: "xdg",
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "emu",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
      multi_card_name: "mastercard",
      value_a: "ref001_A",
      value_b: "ref002_B",
      value_c: "ref003_C",
      value_d: "ref004_D",
    };
    const sslcz = new SSLCommerzPayment(config.store_id, config.store_pass, false);
    sslcz.init(data).then((apiResponse: {GatewayPageURL: any}) => {
      const GatewayPageURL = apiResponse.GatewayPageURL;
      res.json(GatewayPageURL);
    });
  }
);
app.post("/success", async (req, res) => {
  const result = await updateOrderService(req.body.tran_id);
  res.redirect(`https://shofy-e-commerce.netlify.app/orders`);
});
app.post("/fail", async (req, res) => {
  res.redirect(`https://shofy-e-commerce.netlify.app/orders`);
});
app.post("/cancel", async (req, res) => {
  res.redirect(`https://shofy-e-commerce.netlify.app/`);
});
app.post("/ipn", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

////use route
app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Server is Listening..");
});

//global error handle
app.use(globalErrorHandler);
//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not found",
    errorMessgaes: [{path: req.originalUrl, message: "Api not found"}],
  });
  next();
});
export default app;
