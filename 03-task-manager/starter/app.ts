import express from "express"
import { router } from "./routes/tasks"
import { connectDB } from "./db/connect"
import dotenv from "dotenv"
dotenv.config()
import { notFound } from "./middleware/not-found"
import errorHandler from "./middleware/error-handler"
const app = express()

//middleware
app.use(express.static("./public"))
app.use(express.json())

// routes
app.use("/api/v1/tasks", router)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`server is listening on "http://localhost:${port}"`)
    )
  } catch (error) {}
}

start()
