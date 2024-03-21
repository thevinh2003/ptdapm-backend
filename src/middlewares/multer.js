import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../configs/index.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ptdapm_storage",
    allowedFormats: ["jpg", "png", "jpeg", "avif", "gif"],
  },
});
const uploadImage = multer({ storage: storage });

export default uploadImage;
