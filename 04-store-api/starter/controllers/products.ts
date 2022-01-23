import Product from "../models/product";

const getAllProductsStatic = async (req, res) => {
  // throw new Error("testing acync errors");
  const search = "ab";
  const products = await Product.find({
    name: { $regex: search, $options: "i" },
  })
    .select("name price")
    .sort("name");
  res.status(200).json({ products, nbHits: products.length });
};

interface Query {
  featured?: boolean;
  company?: string;
  search?: string;
  name?: object;
  sort?: string;
}

const getAllProducts = async (req, res) => {
  const { featured, company, sort, name, fields } = req.query;
  const queryObject: Query = {};
  // const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  console.log(queryObject);
  let result = Product.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createAt");
  }
  // fields
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({ products, nbHits: products.length });
};

export { getAllProducts, getAllProductsStatic };
