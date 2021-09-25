import dotenv from "dotenv"
import express from "express"
import notFoundMiddleware from "../starter/middleware/not-found"
import errorHandlerMiddleware from "../starter/middleware/error-handler"
import connectDB from "./db/connect"
const app = express()

// midleware
app.use(express.json())

// rootes

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/vi/products">products route</a>')
})

// product route

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000
const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening "http://localhost:${port}"`)
    )
  } catch (err) {}
}

start()
