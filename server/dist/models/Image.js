import mongoose from "mongoose";
const ImageSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
    publicId: {
        type: String,
        required: true,
    },
});
export default mongoose.model("Image", ImageSchema);
