"use client";

import { GET_PRODUCTS } from "@/app/graphql/products";
import { useQuery } from "@apollo/client";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  console.log(data);
  return (
    <div>
      {data.getAllProducts.map((product: any) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
