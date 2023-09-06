/* eslint-disable @typescript-eslint/no-explicit-any */
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {ICartProduct} from "@/interfaces/product";
import {useGetSingleUserQuery} from "@/redux/features/auth/authApi";
import {useGetSingleCartQuery} from "@/redux/features/cart/cartApi";
import {useAddOrderMutation} from "@/redux/features/order/orderApi";
import {useAppSelector} from "@/redux/hooks";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const Checkout = () => {
  const {user} = useAppSelector((state) => state.auth);
  const {data} = useGetSingleCartQuery(user.id);
  const {data: userData} = useGetSingleUserQuery(user?.id);
  const [addOrder, {data: addData, isSuccess, isError}] = useAddOrderMutation();
  //setting form data
  const [formData, setFormData] = useState({
    total_amount: data?.data?.products?.reduce((acc: any, product: ICartProduct) => acc + product.quantity * product.price, 0).toFixed(2),
    shipping_method: "",
    products: data?.data?.products,
    cus_id: user.id,
    cus_add: "",
    cus_city: "",
    cus_postcode: "",
    cus_country: "",
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
    console.log(formData);
  };
  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    formData.total_amount = data?.data?.products?.reduce((acc: any, product: ICartProduct) => acc + product.quantity * product.price, 0).toFixed(2);
    (formData.products = data?.data?.products),
      (formData.cus_id = user.id),
      addOrder({
        order: {...formData},
        cartId: data?.data?._id,
      });
  };
  //showing success or error message
  const navigate = useNavigate();
  useEffect(() => {
    if (!addData?.success && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (addData?.success && addData?.data) {
      Swal.fire("Congratulations!", `Order Placed successfully!`, "success");
      navigate("/orders");
    }
  }, [isSuccess, isError, addData, navigate]);
  return data?.data?.products?.length > 0 ? (
    <div className="my-6 mx-auto">
      <h1 className="font-semibold font-serif text-3xl text-center mb-2">Checkout Form</h1>
      <form onSubmit={handleSubmit} className="px-6 py-8 bg-gray-200 rounded w-9/12 mx-auto">
        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          <div>
            <label htmlFor="name">Name</label>
            <Input type="text" id="name" name="name" value={userData?.data?.name?.firstName} readOnly className="rounded my-2" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Input type="text" id="email" name="email" value={userData?.data?.email} readOnly className="rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <Input type="text" id="phoneNumber" name="phoneNumber" value={userData?.data?.phoneNumber} readOnly className="rounded" />
          </div>
          <div>
            <label htmlFor="shipping_method">Shipping Method</label>
            <Input type="text" id="shipping_method" name="shipping_method" value={formData.shipping_method} onChange={handleInputChange} required className="rounded" />
          </div>
        </div>

        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          <div>
            <label htmlFor="cus_add">Address</label>
            <Input type="text" id="cus_add" name="cus_add" value={formData.cus_add} onChange={handleInputChange} required className="rounded my-2" />
          </div>
          <div>
            <label htmlFor="cus_city">City</label>
            <Input type="text" id="cus_city" name="cus_city" value={formData.cus_city} onChange={handleInputChange} required className="rounded" />
          </div>
        </div>

        <div className="grid grid-cols-2 items-center gap-2 w-full my-2">
          <div>
            <label htmlFor="cus_postcode">PostCode</label>
            <Input type="text" id="cus_postcode" name="cus_postcode" value={formData.cus_postcode} onChange={handleInputChange} className="rounded" />
          </div>
          <div>
            <label htmlFor="cus_country">Country</label>
            <Input type="text" id="cus_country" name="cus_country" value={formData.cus_country} onChange={handleInputChange} className="rounded" />
          </div>
        </div>

        <Button className="mt-2" type="submit">
          Place order
        </Button>
      </form>
    </div>
  ) : (
    <div className="my-12 mx-auto w-9/12 md:h-[350px]">
      <h1 className="font-semibold font-serif text-center text-4xl">Nothing to checkout!</h1>
    </div>
  );
};

export default Checkout;
