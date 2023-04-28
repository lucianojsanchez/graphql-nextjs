import gql from "graphql-tag";
export const typeDefs = gql `
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    quantity: Int!
    category: String!
    imageUrl: String!
    createdAt: String!
    updatedAt: String!
  }

  input ProductInput {
    name: String!
    description: String!
    price: Float!
    quantity: Int!
    category: String!
    imageUrl: String!
  }

  type Query {
    product(ID: ID!): Product!
    getProducts(amount: Int): [Product]
    getAllProducts: [Product]
  }

  type Mutation {
    createProduct(productInput: ProductInput): Product!
    deleteProduct(ID: ID!): Product!
    editProduct(ID: ID!, productInput: ProductInput): Product!
  }
`;
