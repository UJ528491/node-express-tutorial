const { readFile, writeFile } = require("fs");

const util = require("util");
const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile);

// const getText = (path: any) => {
//   return new Promise((resolver, reject) => {
//     readFile(path, "utf-8", (err: any, data: string) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolver(data);
//       }
//     });
//   });
// };

const start = async () => {
  try {
    const first = await readFilePromise("./content/first.txt", "utf-8");
    console.log(first);
  } catch (error) {
    console.log(error);
  }
};
start();

// getText("./content/first.txt")
//   .then(result => console.log(result))
//   .catch(err => console.log(err));
