import {useEffect} from "react";
import {Card, CardContent} from "../ui/card";
import {Button} from "../ui/button";
import {MdDelete} from "react-icons/md";
import {ICartProductProps} from "@/interfaces/product";
import {useDeleteToCartMutation, useHandleQuantityMutation} from "@/redux/features/cart/cartApi";
import {useAppSelector} from "@/redux/hooks";
import Swal from "sweetalert2";
import {useGetSingleProductQuery} from "@/redux/features/products/productApi";

const CartCard = ({product}: ICartProductProps) => {
  const {data: productData} = useGetSingleProductQuery({id: product.productId});
  //handling quantity
  const [handleQuantity] = useHandleQuantityMutation();
  const increaseQuantity = (operation: string) => {
    handleQuantity({
      user: user.id,
      productId: product.productId,
      operation,
    });
  };
  const decreaseQuantity = (operation: string) => {
    if (product.quantity > 0) {
      handleQuantity({
        user: user.id,
        productId: product.productId,
        operation,
      });
    }
  };

  //remove product from cart
  const {user} = useAppSelector((state) => state.auth);

  const [deleteToCart, {data, isError, isSuccess}] = useDeleteToCartMutation();
  const handleDelete = () => {
    deleteToCart({
      user: user.id,
      productId: product.productId,
    });
  };
  //showing success or error message on delete
  useEffect(() => {
    if (!data?.success && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (data?.success && data?.data) {
      Swal.fire("Congratulations!", `Product Deleted from cart successfully!`, "success");
    }
  }, [isSuccess, isError, data]);

  return (
    <Card className="text-black hover:shadow-xl p-2">
      <CardContent className="">
        <div className="grid md:grid-cols-4 justify-between md:items-center gap-2">
          <img src={productData?.data?.image} alt="card image" className="w-14 h-14" />
          <div className="flex flex-col justify-center">
            <p className="lg:text-center mt-3 text-sm font-medium mx-auto">{productData?.data?.category}</p>
            <p className="lg:text-center mt-3 text-sm font-medium mx-auto">{product?.name}</p>
          </div>

          <div className="flex items-center justify-center gap-1 mx-auto">
            <Button className="bg-gray-200 hover:bg-gray-300 text-black font-bold" onClick={() => increaseQuantity("plus")}>
              +
            </Button>
            <h2 className="font-bold">{product.quantity}</h2>
            <Button className="bg-gray-200 hover:bg-gray-300 text-black font-bold" onClick={() => decreaseQuantity("minus")}>
              -
            </Button>
          </div>
          <div className="flex flex-col justify-center items-end">
            <p>{(product?.price * product.quantity).toFixed(2)}৳</p>

            <MdDelete className="text-xl text-red-400 cursor-pointer" onClick={handleDelete} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartCard;
