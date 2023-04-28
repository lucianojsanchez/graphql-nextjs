"use client";

import { GET_PRODUCTS } from "@/app/graphql/products";
import { useQuery } from "@apollo/client";

const ProductList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  console.log(loading, error, data);

  return <div>ProductList</div>;
};

export default ProductList;
