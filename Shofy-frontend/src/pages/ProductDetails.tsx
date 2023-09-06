/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import ProductBadge from "@/components/ui/ProductBadge";
import {Button} from "@/components/ui/button";
import {useGetSingleProductQuery} from "@/redux/features/products/productApi";
import {useParams} from "react-router-dom";
import {BsCheck2Circle} from "react-icons/bs";
import Rating from "react-rating";
import {FaStar} from "react-icons/fa";
import {useEffect, useState} from "react";
import {useAddToCartMutation} from "@/redux/features/cart/cartApi";
import Swal from "sweetalert2";
import {useAppSelector} from "@/redux/hooks";
const ProductDetails = () => {
  const {id} = useParams();
  const {data} = useGetSingleProductQuery({id});
  //handling quantity of product
  const [quantity, setQuantity] = useState(1);
  const handleQuantity = (operation: string) => {
    if (operation === "plus") {
      setQuantity(quantity + 1);
    }
    if (operation === "minus" && quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  //adding product to cart
  const {user} = useAppSelector((state) => state.auth);
  const [addToCart, {data: addData, isSuccess, isError}] = useAddToCartMutation();
  const handleAddToCart = () => {
    addToCart({
      product: {
        price: data?.data?.price,
        name: data?.data?.name,
        productId: data?.data?._id,
        quantity: quantity,
      },
      user: user.id,
    });
  };
  //showing success or error message
  useEffect(() => {
    if (!addData?.success && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (addData?.success && addData?.data) {
      Swal.fire("Congratulations!", `Product Added to cart successfully!`, "success");
    }
  }, [isSuccess, isError, addData]);
  return (
    <section className="">
      <div className="md:container w-11/12 flex flex-col items-center mx-auto lg:flex-row mt-4 py-8">
        <div className="w-full lg:w-1/3">
          <img src={data?.data?.image} alt="product" className="w-full" />
        </div>
        <div className="flex flex-col w-full p-6 lg:w-2/3 md:p-8 lg:p-12">
          <p className="text-2xl text-primary font-semibold font-serif">{data?.data?.name}</p>
          <div className="flex md:items-center gap-3 mt-3 flex-wrap">
            <ProductBadge text="Price:" value={`${data?.data?.price}`} />
            <ProductBadge text="Status:" value={`${data?.data?.status}`} />
            <ProductBadge text="Category:" value={`${data?.data?.category}`} />
            <ProductBadge text="Sub Category:" value={`${data?.data?.subCategory}`} />
          </div>
          <div className="border-b border-gray-300 my-2">
            <p className="text-lg">
              <span className="font-medium ">Color:</span> {data?.data?.color}
            </p>
            <p>
              <span className="font-medium ">Size:</span> {data?.data?.size}
            </p>
            <h1 className="my-2">
              {" "}
              <span className="font-semibold text-primary my-2 text-lg ">Description:</span>
              {data?.data?.description}
            </h1>
            <p>
              <Rating initialRating={parseFloat((data?.data?.rating?.reduce((acc: any, rating: any) => acc + rating, 0) / data?.data?.rating?.length).toFixed(1))} emptySymbol={<FaStar className="text-yellow-200 text-lg" />} fullSymbol={<FaStar className="text-yellow-500 text-lg" />} readonly></Rating>
            </p>
            <div className="flex items-center gap-1">
              <Button className="bg-gray-200 hover:bg-gray-300 text-black font-bold" onClick={() => handleQuantity("plus")}>
                +
              </Button>
              <h2 className="font-bold">{quantity}</h2>
              <Button className="bg-gray-200 hover:bg-gray-300 text-black font-bold" onClick={() => handleQuantity("minus")}>
                -
              </Button>
            </div>
            <Button variant={"outline"} className="my-4 w-1/5 bg-white hover:bg-black hover:text-gray-300" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
          <div>
            <p>
              <span className="font-medium ">Product SKU:</span>
              {data?.data?.sku}
            </p>
            <p>
              <span className="font-medium ">Product Dimension:</span>
              {data?.data?.dimension}
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-lg font-medium">
              {" "}
              <BsCheck2Circle /> 30 days easy return
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
