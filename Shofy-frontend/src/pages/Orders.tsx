import {Button} from "@/components/ui/button";
import {IOrder} from "@/interfaces/order";
import {useGetAllOrderQuery, useMakePaymentMutation} from "@/redux/features/order/orderApi";
import {useAppSelector} from "@/redux/hooks";
import {useEffect} from "react";
import Swal from "sweetalert2";

const Orders = () => {
  const {user} = useAppSelector((state) => state.auth);
  const {data} = useGetAllOrderQuery(user.id);
  //making payment
  const [makePayment, {data: paymentData, isSuccess, isError}] = useMakePaymentMutation();
  const handlePayment = (order: IOrder) => {
    makePayment({
      total_amount: order.total_amount,
      shipping_method: order.shipping_method,
      products: order.products,
      tran_id: order.tran_id,
      cus_id: order.cus_id,
      cus_add: order.cus_add,
      cus_city: order.cus_city,
      cus_postcode: order.cus_postcode,
      cus_country: order.cus_country,
    });
  };
  useEffect(() => {
    if (paymentData) {
      window.location.replace(paymentData);
    }
    if (!paymentData && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }
  }, [isSuccess, isError, paymentData]);
  return data?.data?.length > 0 ? (
    <div className="w-9/12 mx-auto py-14">
      <div className="flex items-center mb-3">
        <p className="text-xl font-semibold font-serif">Your Orders:</p>
      </div>
      <div className="grid grid-cols-1 gap-4 justify-center px-6 bg-gray-100 py-6">
        {data?.data?.map((order: IOrder, i: number) => (
          <div key={i} className="shadow-md p-4 grid grid-cols-6 bg-white">
            <div className="col-span-3">
              <p>
                <span className="font-semibold text-lg">Order Id:</span>
                {order._id}
              </p>
              <p>
                <span className="font-semibold text-lg">TransactionId:</span>
                {order.tran_id}
              </p>
            </div>
            <p>
              <span className="font-semibold text-lg">Total: </span>
              {order.total_amount}৳
            </p>
            <p>
              <span className="font-semibold text-lg">Products: </span>
              {order.products?.length}
            </p>
            {order.payment === "pending" ? <Button onClick={() => handlePayment(order)}>Make Payment</Button> : <Button className="bg-green-700 text-gray-100 hover:bg-green-700">Payment Complete</Button>}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="my-12 mx-auto w-9/12 h-[350px]">
      <h1 className="font-semibold font-serif text-center text-4xl">No orders found!</h1>
    </div>
  );
};
export default Orders;
