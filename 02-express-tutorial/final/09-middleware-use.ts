import Express from "express";
import { logger } from "./logger";
const app = Express();
// req => middleware => res

app.use("/api", logger);
// api/home/about/products
app.get("/", (req, res) => {
  res.send("Home");
});
app.get("/about", (req, res) => {
  res.send("About");
});
app.get("/api/products", (req, res) => {
  res.send("Products");
});
app.get("/api/items", (req, res) => {
  res.send("Items");
});

app.listen(5000, () => {
  console.log(`server is listening "http://localhost:5000"`);
});
