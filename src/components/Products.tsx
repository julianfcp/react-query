import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct } from "../api/productsAPI";
import CreateProductForm from "./CreateProductForm";

interface productType {
  id: number;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
}

function Products() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: products,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    //order
    select: (products) =>
      products.sort((a: productType, b: productType) => b.id - a.id),
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log("Product Deleted!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleDelete = (id: number) => {
    deleteProductMutation.mutate(id);
  };

  if (isLoading) return <div>isLoading...</div>;
  else if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Products</h1>
      <p>{JSON.stringify(products)}</p>
      <br />
      <CreateProductForm />
      {products.map((product: productType) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <button onClick={() => handleDelete(product.id)}>Delete</button>
          <input type="checkbox" />
          <label htmlFor="">InStock</label>
        </div>
      ))}
    </div>
  );
}

export default Products;
