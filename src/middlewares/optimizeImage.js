import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";

const optimizeImage = async (req, res, next) => {
  try {
    if (req?.file) {
      let imageFile = req.file;
      // Validate check image file
      if (!imageFile.mimetype.startsWith("image")) {
        return res.status(400).json({ message: "Please upload an image" });
      }
      imageFile = await imagemin(["images/*.{jpg,png,jpeg,avif,gif}"], {
        plugins: [
          imageminJpegtran(),
          imageminPngquant({
            quality: [0.6, 0.8],
          }),
        ],
      });
    }
    next();
  } catch (error) {
    console.error("Fail to optimize images", error);
    next(error);
  }
};

export default optimizeImage;
