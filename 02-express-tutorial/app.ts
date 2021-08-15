// const http = require('http')
import http from "http";
import { readFileSync } from "fs";

// get all files
const homePage = readFileSync("./index.html");
const server = http.createServer((req, res) => {
  const url = req.url;
  // home page
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homePage);
    // res.write("<h1>hi ujong</h1>");
    res.end();
  }
  // about page
  else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>about page</h1>");
    res.end();
  }
  // 404
  else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>Page not found!</h1>");
    res.end();
  }
});

server.listen(5000);
