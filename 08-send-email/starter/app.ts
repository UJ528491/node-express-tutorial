require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// error handler
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("<h1>Email Project</h1>");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(
      port,
      console.log(`Server is listening on port "http://localhost:${port}"...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
