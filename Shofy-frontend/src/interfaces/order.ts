import {ICartProduct} from "./product";

export type IOrder = {
  total_amount: number;
  currency: "BDT";
  payment: "pending" | "complete";
  tran_id: string; // use unique tran_id for each api call
  shipping_method: string; //"Courier"
  products: ICartProduct[];
  cus_id: string;
  cus_add: string;
  cus_city: string;
  cus_postcode: string;
  cus_country: string;
  _id: string;
};
