import Product from "../models/Product.js";
export const resolvers = {
    Query: {
        async product(_, { ID }) {
            return await Product.findById(ID);
        },
        async getProducts(_, { amount }) {
            return await Product.find().sort({ createdAt: -1 }).limit(amount);
        },
        getAllProducts: async () => {
            return await Product.find().sort({ createdAt: -1 });
        },
    },
    Mutation: {
        async createProduct(_, { productInput: { name, description, price, quantity, category, imageUrl, }, }) {
            const createdProduct = new Product({
                name: name,
                description: description,
                price: price,
                quantity: quantity,
                category: category,
                imageUrl: imageUrl,
                createdAt: new Date().toISOString(),
            });
            const savedProduct = await createdProduct.save();
            return {
                id: savedProduct.id,
                ...savedProduct.toObject(),
            };
        },
    },
};
