/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import ProductCard from "@/components/products/ProductCard";
import SearchFilter from "@/components/products/SearchFilter";
import Error from "@/components/ui/Error";
import CardSkeleton from "@/components/ui/CardSkeleton";
import {useGetProductsQuery} from "@/redux/features/products/productApi";
import {IProduct} from "@/interfaces/product";
import {useEffect, useState} from "react";
import {useAppSelector} from "@/redux/hooks";
const Products = () => {
  const queryParams: Array<string> = [];
  const [url, setUrl] = useState("");
  const {data, isLoading, isError} = useGetProductsQuery(url, {
    refetchOnMountOrArgChange: true,
  });
  const {searchText, category, subCategory} = useAppSelector((state) => state.filter);
  //joining query string
  useEffect(() => {
    if (searchText !== "") {
      queryParams.push(`searchTerm=${encodeURIComponent(searchText)}`);
    }
    if (category !== "") {
      queryParams.push(`category=${encodeURIComponent(category)}`);
    }
    if (subCategory !== "") {
      queryParams.push(`subCategory=${encodeURIComponent(subCategory)}`);
    }
    if (queryParams.length > 0) {
      setUrl(`${queryParams.join("&")}`);
    }
    if (!queryParams.length) {
      setUrl("");
    }
  }, [category, subCategory, queryParams, searchText, url]);
  // decide what to render
  let content = null;

  if (isError) {
    content = <div className="mt-10">{<Error message="There was an error occured" />}</div>;
  }
  if (!isError && isLoading) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 mt-4 ">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }
  if (!isError && !isLoading && data?.data?.length > 0) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-5 mx-auto">
        {data?.data?.map((product: IProduct) => (
          <ProductCard product={product} key={product?._id} />
        ))}
      </div>
    );
  }
  if (!isError && !isLoading && data?.data?.length === 0) {
    content = <div className="grid grid-cols-1 justify-center items-center gap-4 mt-8 pb-8 w-11/12 mx-auto">No Products Found!</div>;
  }
  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <SearchFilter data={data?.data} />

      <div className="col-span-9 my-5">{content}</div>
    </div>
  );
};

export default Products;
