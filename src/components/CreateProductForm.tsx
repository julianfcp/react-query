import { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/productsAPI";

function CreateProductForm() {
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      console.log("Product Added");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const product = Object.fromEntries(formData);
    addProductMutation.mutate({
      ...product,
      inStock: true,
    });
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <input type="text" id="name" name="name" placeholder="Name" />
        <input
          type="text"
          id="name"
          name="description"
          placeholder="Description"
        />
        <input type="text" id="name" name="price" placeholder="price" />
        <button>Add Product</button>
      </form>
    </>
  );
}

export default CreateProductForm;
