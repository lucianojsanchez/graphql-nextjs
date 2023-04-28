import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  {
    getAllProducts {
      _id
      name
      description
      price
      quantity
      category
      imageUrl
      createdAt
      updatedAt
    }
  }
`;
