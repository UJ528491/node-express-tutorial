import Express from "express";
const { products, people } = require("./data");

const app = Express();

interface products {
  id: number;
  name: string;
  image: string;
  price: number;
  desc: string;
}
app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1><a href='/api/products'>products</a>");
  // res.json(products);
});

app.get("/api/products", (req, res) => {
  const newProducts: [] = products.map((product: products) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

app.get("/api/products/:productID", (req, res) => {
  // console.log(req.params);
  const { productID } = req.params;
  const singleProduct: products = products.find((product: products) => {
    return product?.id === Number(productID);
  });
  if (!singleProduct) {
    return res.status(404).send("Product Does not Exist");
  }
  return res.json(singleProduct);
});

app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  console.log(req.params);
  res.send("hello world");
});

app.get("/api/v1/query", (req, res) => {
  console.log(req.query);
  const { search, limit } = req.query;
  let sortedProducts = [...products];
  if (search) {
    sortedProducts = sortedProducts.filter(product => {
      return product.name.startsWith(search);
    });
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts.length < 1) {
    // res.status(200).send("no product matched your search");
    return res.status(200).json({ success: true, data: [] });
  }
  res.status(200).json(sortedProducts);
  res.send("hello world");
});

app.listen(5000, () => {
  console.log(`server is listening "http://localhost:5000"`);
});
