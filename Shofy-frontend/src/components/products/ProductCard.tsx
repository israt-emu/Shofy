/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {IProductProps} from "@/interfaces/product";
import {Button} from "../ui/button";
import {Link} from "react-router-dom";
import Rating from "react-rating";
import {FaStar} from "react-icons/fa";
import {useAddToCartMutation} from "@/redux/features/cart/cartApi";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {useAppSelector} from "@/redux/hooks";
const ProductCard = ({product}: IProductProps) => {
  //
  const [quantity, setQuantity] = useState(1);
  const {user} = useAppSelector((state) => state.auth);
  //adding product to cart
  const [addToCart, {data, isSuccess, isError}] = useAddToCartMutation();
  const handleAddToCart = () => {
    if (user.id) {
      addToCart({
        product: {
          price: product?.price,
          name: product?.name,
          productId: product?._id,
          quantity: quantity,
        },
        user: user.id,
      });
    } else {
      Swal.fire("Sorry!", `You have to login first!`, "error");
    }
  };
  //
  const handleQuantity = (operation: string) => {
    if (operation === "plus") {
      setQuantity(quantity + 1);
    }
    if (operation === "minus" && quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  //showing success or error message when adding product
  useEffect(() => {
    if (!data?.success && isError) {
      Swal.fire("Oops!", `Something Went wrong`, "error");
    }

    if (data?.success && data?.data) {
      Swal.fire("Congratulations!", `Product Added to cart successfully!`, "success");
    }
  }, [isSuccess, isError, data]);
  return (
    <Card className="h-full">
      <Link to={`/product-details/${product._id}`}>
        <CardHeader>
          <img src={product?.image} alt="card image" className="h-48" />
          <CardTitle>{product?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Category:{product?.category}</p>
          <p>Sub-Category:{product?.subCategory}</p>
          <p>Status:{product?.status}</p>
          <p>price:{product?.price}৳</p>
          <div className="flex items-center gap-1">
            <Rating initialRating={parseFloat((product?.rating?.reduce((acc, rating) => acc + rating, 0) / product?.rating?.length).toFixed(1))} emptySymbol={<FaStar className="text-yellow-200 text-lg" />} fullSymbol={<FaStar className="text-yellow-500 text-lg" />} readonly />
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button className="bg-gray-200 hover:bg-gray-300 text-black font-bold" onClick={() => handleQuantity("plus")}>
            +
          </Button>
          <h2 className="font-bold">{quantity}</h2>
          <Button className="bg-gray-200 hover:bg-gray-300 text-black font-bold" onClick={() => handleQuantity("minus")}>
            -
          </Button>
        </div>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
