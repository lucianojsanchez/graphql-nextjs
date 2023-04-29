import gql from "graphql-tag";
export const typeDefs = gql `
  scalar Upload
  type Product {
    _id: ID!
    name: String!
    description: String!
    price: Float!
    quantity: Int!
    category: String!
    imageId: String
    imageUrl: String!
    createdAt: String!
    updatedAt: String!
  }

  type Image {
    _id: ID!
    filename: String!
    url: String!
    size: Int
    mimetype: String!
  }

  input ProductInput {
    name: String!
    description: String!
    price: Float!
    quantity: Int!
    category: String!
  }

  type Query {
    product(ID: ID!): Product!
    getProducts(amount: Int): [Product]
    getAllProducts: [Product]
  }
  type DeleteAllProductsResponse {
    message: String!
  }
  type Mutation {
    createProduct(productInput: ProductInput!, file: Upload!): Product!
    deleteProduct(ID: ID!): DeleteAllProductsResponse!
    deleteAllProducts: DeleteAllProductsResponse!
    editProduct(ID: ID!, productInput: ProductInput): Product!
    uploadImage(file: Upload): Image!
  }
`;
