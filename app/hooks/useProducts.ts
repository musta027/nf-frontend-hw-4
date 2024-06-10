import { axiosProduct } from "../api/axiosInstances"; 
import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";

type ProductProps = {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
  };

const createProduct = async (productData:ProductProps): Promise<ProductProps> => {
    const res = await axiosProduct.post<ProductProps>('/products', productData);
    alert("it works, check console");
    console.log(res.data);
    return res.data;
}

const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation<ProductProps, Error, ProductProps>({
      mutationFn: createProduct,
      onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['CategoriesProductData']});
      },
  });
}

export { useCreateProduct };