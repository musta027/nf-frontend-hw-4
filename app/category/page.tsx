"use client";
import React from "react";
import { useParams } from "next/navigation";
import { getCategory } from "@/app/api/services/productServices";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";

type Props = {};

type ProductProps = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

const CategoryPage = (props: Props) => {
  const { category } = useParams();
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["CategoriesProductData"],
    queryFn: () => getCategory(typeof category === "string" ? category : ""),
  });
  if (isLoading)
    return <div className="text-center">Categories are loading...</div>;
  if (isError) {
    console.log(error);
    return <div className="text-center">Sorry there was an error</div>;
  }
  if (typeof category !== "string") {
    return <div></div>;
  }
  //   console.log(data);
  return (
    <div>
      <div className="text-center font-bold text-lg">
        Welcome to the {category.replaceAll("%20", " ")} category
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {data?.data.map((product: ProductProps, index: number) => {
          return <ProductCard key={index} product={product} />;
        })}
      </div>
    </div>
  );
};

export default CategoryPage;