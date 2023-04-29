import React from "react";
import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <div>
      <h2>{product.name}</h2>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={30}
        height={30}
      ></Image>
    </div>
  );
};

export default ProductCard;
