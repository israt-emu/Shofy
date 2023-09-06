/* eslint-disable @typescript-eslint/no-explicit-any */
import CartCard from "@/components/cart/CartCard";
import Error from "@/components/ui/Error";
import {Button} from "@/components/ui/button";
import {ICartProduct} from "@/interfaces/product";
import {useGetSingleCartQuery} from "@/redux/features/cart/cartApi";
import {useAppSelector} from "@/redux/hooks";
import {Link} from "react-router-dom";

const Cart = () => {
  const {user} = useAppSelector((state) => state.auth);
  const {data, isLoading, isError} = useGetSingleCartQuery(user.id);
  //let decide what to render
  let content = null;
  if (isLoading) {
    content = <h1>Loading...</h1>;
  }
  if (!isLoading && isError) {
    content = <Error message="No Products in cart!" />;
  }
  if (!isLoading && data?.data?.products?.length === 0) {
    content = <h1 className="font-semibold font-serif text-xl">No Products in cart!</h1>;
  }
  if (!isLoading && data?.data?.products?.length > 0) {
    content = data?.data?.products?.length > 0 && data?.data?.products?.map((product: ICartProduct, i: number) => <CartCard product={product} key={i} />);
  }
  return (
    <div className="w-9/12 mx-auto py-12">
      <div className="flex items-center mb-3">
        <p className="text-xl font-semibold font-serif">Shopping Cart:</p>
      </div>
      <div className="grid grid-cols-1 gap-4 justify-center px-6 bg-gray-100 py-6">
        {content}
        <div className="border-t border-gray-200 py-2 flex items-center justify-between">
          <h3>Total</h3>
          <h3>{data?.data?.products?.reduce((acc: any, product: ICartProduct) => acc + product.quantity * product.price, 0).toFixed(2)}৳</h3>
        </div>

        <Button className="w-1/6 ml-auto">
          <Link className="" to="/checkout">
            Checkout
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Cart;
