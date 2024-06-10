"use client";

import React, { useState } from "react";
import { getAllCategories } from "../api/services/productServices";
import { useQuery } from "@tanstack/react-query";
import { axiosFile } from "../api/axiosInstances";
import Image from "next/image";

import { useCreateProduct } from "../hooks/useProducts";

import personSrc from "@/public/person.png";

type Props = {};

interface photoProps {
  id: number;
  src: string;
  percentCompleted: number;
}

const ProductCreatePage = (props: Props) => {
  const [photo, setPhoto] = useState<photoProps[]>([]);
  const [totId, setTotId] = useState<number>(0);

  const { mutate: createProduct, isPending } = useCreateProduct();

  const handleDelete = (index: number): void => {
    console.log(index, photo);
    const newProps = [...photo];
    console.log(newProps);
    newProps.splice(index, 1);
    console.log(newProps);
    setPhoto(newProps);
  };

  const handleChangeSrc = (index: number, src: string): void => {
    const newProps = [...photo];
    newProps[index].src = src;
    setPhoto(newProps);
  };

  const handleChangePercent = (index: number, calc: number): void => {
    const newProps = [...photo];
    newProps[index].percentCompleted = calc;
    setPhoto(newProps);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    photo.map((item: photoProps, index: number) => {
      if (item.percentCompleted !== 100) {
        alert("Wait for the files to load");
        return;
      }
    });

    photo.map((item: photoProps, index: number) => {
      createProduct({
        id: 1000 + item.id,
        title: e.currentTarget.productname.value,
        price: e.currentTarget.productprice.value,
        category: e.currentTarget.category.value,
        description: `its a ${e.currentTarget.category.value}`,
        image: item.src,
      });
    });
    setPhoto([]);
    e.currentTarget.productname.value = "";
    e.currentTarget.productprice.value = null;
  };

  const handleAddFile = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.currentTarget.files == null) return;
    handleChangePercent(index, 0);
    const file = e.currentTarget.files[0];
    console.log(e.currentTarget.files[0]);
    const formData = new FormData();
    formData.append("file", file);

    axiosFile
      .post("/upload", formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const calcPercentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            handleChangePercent(index, calcPercentage);
          }
        },
      })
      .then((response) => {
        handleChangeSrc(index, response.data.location);
        console.log("Upload successful!", response.data);
      })
      .catch((error) => {
        console.error("Upload failed!", error);
      });
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["CategoryData"],
    queryFn: getAllCategories,
  });
  
  if (isLoading)
    return <div className="text-center">Categories are loading...</div>;
  if (isError) {
    console.log(error);
    return <div className="text-center">Sorry there was an error</div>;
  }
  return (
    <div className="min-h-screen">
      <div className="flex w-full items-start pt-20 justify-center">
        <div className="w-[80%] p-8 bg-white rounded-lg shadow-md">
          <div>
            <h2 className="text-3xl font-extrabold  text-gray-900">
            Создать объявление
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              handleSubmit(e);
              //   e.currentTarget.password.value = "";
            }}
          >
            <div className="rounded-md shadow-sm">
              <div>
                <label>Опишите в подробностях</label>
                <input
                  id="productname"
                  name="productname"
                  required
                  className="relative block w-full px-3 py-2 mt-2 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="For example, Iphone 14"
                />
              </div>
              <div>
                <label htmlFor="category">Категория* ("код тут почему  то не работает")</label>
                <div className="mt-2">
                <select name="category" id="category">
                {
                  
                  data.forEach((el: string, index: number) => {
                    return(
                      <option value={el} key={index}>
                        {el}
                      </option>
                    )
                  })}
                </select>
                </div>
              </div>
              <div className="my-4">
                <label htmlFor="productprice">Enter price $</label>
                <input
                  id="productprice"
                  name="productprice"
                  required
                  type="number"
                  className="relative block w-full px-3 py-2 mt-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="For example, 23$"
                />
              </div>
            </div>
            <div
              className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4"
              id="holdFiles"
            >
              {photo.map((card: photoProps, index: number) => {
                return (
                  <div key={index} className="flex flex-col gap-4 w-32 h-full">

                    <div className="relative w-[128px] h-[128px]">
                      <input
                        className="z-50 absolute opacity-0 w-full h-full"
                        type="file"
                        name="file"
                        id="file"
                        accept="image/*"
                        multiple
                        required
                        onChange={(e) => {
                          handleAddFile(index, e);
                        }}
                      ></input>

                      {card.src !== "" && (
                        <Image
                          src={card.src}
                          fill
                          alt="filePicture"
                          className=" bg-gray-300 cursor-pointer absolute rounded"
                        ></Image>
                      )}
                      {card.src === "" && (
                        <Image
                          priority
                          src={personSrc}
                          fill
                          alt="filePicture"
                          className=" bg-gray-300 cursor-pointer absolute rounded"
                        ></Image>
                      )}
                    </div>
                    <div className="w-full rounded-lg bg-gray-400 h-6">
                      <div
                        className={`bg-green-500 h-full rounded-lg `}
                        style={{
                          width: card.percentCompleted + "%",
                        }}
                      >
                        {card.src !== "" && (
                          <div className="flex justify-center">
                            <button
                              type="button"
                              onClick={() => {
                                handleDelete(index);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <button
                type="button"
                className="h-44 bg-gray-300 w-32 flex items-center justify-center"
                onClick={() => {
                  setPhoto((photo) => [
                    ...photo,
                    { id: totId, src: "", percentCompleted: 0 },
                  ]);
                  setTotId(totId + 1);
                }}
              >
                Add a photo file
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Product!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreatePage;