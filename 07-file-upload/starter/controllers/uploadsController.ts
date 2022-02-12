import { StatusCodes } from "http-status-codes";
import path from "path";

const uploadProductImage = async (req, res) => {
  const productImage = req.files.image;
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
