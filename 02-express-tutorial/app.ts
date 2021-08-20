import Express from "express";
const { products, people } = require("./data");

const app = Express();

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1><a href='/api/products'>products</a>");
  // res.json(products);
});

app.get("/api/products", (req, res) => {
  const newProducts: [] = products.map(
    (product: { id: string; name: string; image: string }) => {
      const { id, name, image } = product;
      return { id, name, image };
    }
  );
  res.json(newProducts);
});

app.listen(5000, () => {
  console.log(`server is listening "http://localhost:5000"`);
});
