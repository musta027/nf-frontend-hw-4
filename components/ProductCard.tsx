import React from "react";
import Image from "next/image";

type Props = {
  product: {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
  };
};



const ProductCard = ({ product }: Props) => {
  return (
    <div className="flex items-center rounded-lg shadow-lg p-4 box-border h-full">
      <div className="w-5/6">
        <div>
          <div className="text-black text-xl mb-4 font-bold">
            {product.title}
          </div>
          <div className="text-black font-bold text-xl my-4">
            Price: {product.price}$
          </div>
          <div className="text-gray-600 text-base mb-6 w-full text-ellipsis whitespace-nowrap overflow-hidden">
            {product.description}
          </div>
        </div>
      </div>
      <div className="w-2/6 bg-gray-200 ml-4 h-[100px] rounded text-gray-400 relative">
        <Image src={product.image} fill alt="product item"></Image>
      </div>
    </div>
  );
};


export default ProductCard;
