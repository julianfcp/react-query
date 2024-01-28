import axios from "axios";

interface productFormType {
  [k: string]: FormDataEntryValue | boolean;
}

const productsApi = axios.create({
  baseURL: "http://localhost:3000/products",
});

export const getProducts = async () => {
  const res = await productsApi.get("/");
  return res.data;
};

export const createProduct = (product: productFormType): Promise<void> => {
  return productsApi.post("/", product);
};

export const deleteProduct = (id: number) => {
  return productsApi.delete(`/${id}`);
};
