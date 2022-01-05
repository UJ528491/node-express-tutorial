import Product from "../models/product";

const getAllProductsStatic = async (req, res) => {
  // throw new Error("testing acync errors");
  const products = await Product.find({ page: "2" });
  res.status(200).json({ products, nbHits: products.length });
};
const getAllProducts = async (req, res) => {
  const { featured } = req.qeury;
  const qeuryObject = { featured };
  if (featured) {
    qeuryObject.featured = featured === "true" ? true : false;
  }
  const products = await Product.find(req.query);
  res.status(200).json({ products, nbHits: products.length });
};

export { getAllProducts, getAllProductsStatic };
