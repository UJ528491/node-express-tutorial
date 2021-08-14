const { createReadStream } = require("fs");

const stream = createReadStream("./content/big.txt", { highWaterMark: 90000 });

stream.on("data", (results: string) => {
  console.log(results);
});
stream.on("error", (err: any) => console.log(err));
