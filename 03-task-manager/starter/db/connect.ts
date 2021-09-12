import mongoose from "mongoose";

const pw = "dbwhd";
const connectionString = `mongodb+srv://ujong:${pw}@nodeexpressprojects.7tglc.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority`;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connect to the DB..."))
  .catch(err => console.log(err));
