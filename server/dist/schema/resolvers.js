import Product from "../models/Product.js";
import Image from "../models/Image.js";
import { GraphQLUpload } from "graphql-upload-minimal";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidv4 } from "uuid";
const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
};
export const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        product: async (_, { ID }) => {
            return await Product.findById(ID);
        },
        getProducts: async (_, { amount }) => {
            return await Product.find().sort({ createdAt: -1 }).limit(amount);
        },
        getAllProducts: async () => {
            return await Product.find().sort({ createdAt: -1 });
        },
    },
    //---------------------------------------------------------------------------------------------------------------------------------//
    Mutation: {
        createProduct: async (_, { productInput, file }) => {
            const { createReadStream, filename, mimetype, encoding } = await file;
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });
            // generate a unique filename and upload the file to Cloudinary
            const uniqueFilename = `${uuidv4()}-${filename}`;
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: "Assets", public_id: uniqueFilename }, (error, result) => {
                    if (error)
                        reject(error);
                    else
                        resolve(result);
                });
                createReadStream().pipe(stream);
            });
            // create a new image in the database
            const { secure_url, public_id, format, bytes } = result;
            const image = new Image({
                filename: public_id,
                url: secure_url,
                size: bytes,
                mimetype: mimetype,
                publicId: public_id,
            });
            await image.save();
            // create a new product in the database
            const createdProduct = new Product({
                name: productInput.name,
                description: productInput.description,
                price: productInput.price,
                quantity: productInput.quantity,
                category: productInput.category,
                imageId: image._id,
                imageUrl: secure_url,
                createdAt: new Date(),
            });
            await createdProduct.save();
            console.log("Product Created");
            return createdProduct;
        },
        deleteProduct: async (_, { ID }) => {
            cloudinary.config(cloudinaryConfig);
            const product = await Product.findById(ID);
            if (!product) {
                throw new Error("Product not found.");
            }
            // retrieve the image for the product
            const image = await Image.findById(product.imageId);
            if (!image) {
                throw new Error("Image not found.");
            }
            // delete image from Cloudinary
            cloudinary.uploader.destroy(image.filename);
            console.log("Image succesfully deleted from Cloudinary.");
            // delete product and image from MongoDB
            await Product.findByIdAndDelete(ID);
            await Image.findByIdAndDelete(image._id);
            console.log("Product and image deleted from MongoDB.");
            return { message: `Product ${ID} succesfully deleted` };
        },
        deleteAllProducts: async ({ cloudinary }) => {
            const images = await Image.find();
            const publicIds = images.map((image) => image.publicId);
            await cloudinary.api.delete_resources(publicIds);
            console.log("All images deleted from Cloudinary.");
            // delete all products and images from MongoDB
            await Image.deleteMany();
            await Product.deleteMany();
            console.log("All products and images deleted from MongoDB.");
            return { message: "All products and images deleted." };
        },
    },
};
// ------------------------------------------------------------------------------------------------ //
// Single image Upload
// async uploadImage(_, { file }) {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });
//   const { createReadStream, filename, mimetype, encoding } = await file;
//   const uniqueFilename = `${uuid()}-${filename}`;
//   const result: CloudinaryResult = await new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder: "Assets", public_id: uniqueFilename },
//       (error, result) => {
//         if (error) reject(error);
//         else resolve(result);
//       }
//     );
//     createReadStream().pipe(stream);
//   });
//   const { secure_url, public_id, format, bytes } = result;
//   const image = new Image({
//     filename: public_id,
//     url: secure_url,
//     size: bytes,
//     mimetype: mimetype,
//   });
//   await image.save();
//   return {
//     filename: public_id,
//     url: secure_url,
//     mimetype,
//     encoding,
//   };
// },
