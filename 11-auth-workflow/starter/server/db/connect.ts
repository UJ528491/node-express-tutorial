const mongoose = require("mongoose");

const connectDB = (url: any) => {
  return mongoose.connect(url);
};

export default connectDB;
