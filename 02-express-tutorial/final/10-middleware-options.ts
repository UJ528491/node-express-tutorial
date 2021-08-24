import Express from "express";
import { logger } from "./logger";
import { authorize } from "./authorize";
import morgan from "morgan";
const app = Express();
// req => middleware => res
// 1. use vs route
// 2. options - our own / express / third party

// app.use([authorize, logger]);
// app.use(express.static("./public"));
app.use(morgan("tiny"));
app.get("/", (req, res) => {
  res.send("Home");
});
app.get("/about", (req, res) => {
  res.send("About");
});
app.get("/api/products", (req, res) => {
  res.send("Products");
});
app.get("/api/items", [logger, authorize], (req, res) => {
  console.log(req.user);

  res.send("Items");
});

app.listen(5000, () => {
  console.log(`server is listening "http://localhost:5000"`);
});
