import express from "express";
const app = express();

import people from "./routes/people";
import auth from "./routes/auth";

// static  assets
app.use(express.static("./methods-public"));
// parse form data
// urlencoded() : built-in middleware in express
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.use("/api/people", people);

app.use("/login", auth);

app.listen(5000, () => {
  console.log(`server is listening "http://localhost:5000"`);
});
