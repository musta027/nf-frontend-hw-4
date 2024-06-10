"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../app/api/services/productServices";
import { Product } from "@/app/interfaces/Product";
type Props = {};

const ProductList = (props: Props) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["CategoryData"],
    queryFn: getAllProducts,
  });

  console.log(data);
  
  if (isLoading)
    return <div className="text-center">Products are loading...</div>;
  if (isError) {
    console.log(error);
    return <div className="text-center">Sorry there was an error</div>;
  }


  return (
    <div className="grid grid-cols-5 gap-[3px] p-4 justify-center">
      {data?.map((product: Product, index: number) => {
        return (
          <Link
            href={`/`}
            key={index}
            className="h-64 w-64 rounded shadow flex flex-col"
          >
            <div className="h-3/4 w-full flex items-center justify-center bg-gray-200 text-gray-400">
              *photo*
            </div>
            <div className="h-1/4 flex items-center justify-center text-base font-bold">
              {product.title}
            </div>
            <div className="text-center p-2 text-sm text-gray-600">
              Description for {product.description}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductList;
