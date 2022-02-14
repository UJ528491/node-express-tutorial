import { StatusCodes } from "http-status-codes";
import path from "path";
import { CustomAPIError, BadRequestError } from "../errors";

const uploadProductImage = async (req, res) => {
  // check if file exists
  // check format
  // check size
  console.log(req.files);

  if (!req.files) {
    throw new BadRequestError("No file uploaded");
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image/")) {
    throw new BadRequestError("Only images allowed");
  }
  // max size 2mb
  const maxSize = 1024 * 1024 * 2;
  if (productImage.size > maxSize) {
    throw new BadRequestError("Please upload an image smaller than 1mb");
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};
export default uploadProductImage;
