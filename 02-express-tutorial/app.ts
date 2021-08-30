import express from "express";
const app = express();
let { people } = require("./data");

// static  assets
app.use(express.static("./methods-public"));
// parse form data
// urlencoded() : built-in middleware in express
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name vlaue" });
  }
  res.status(201).json({ success: true, person: name });
});
app.post("/api/postman/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name vlaue" });
  }
  res.status(201).json({ success: true, data: [...people, name] });
});
app.post("/login", (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("Please Provide Credentials");
});
app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const person = people.find(person => {
    person.id === Number(id);
  });
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: `no person with id ${id}` });
  }
  const newPeople = people.map(person => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  res.status(200).json({ success: true, data: newPeople });
});

app.listen(5000, () => {
  console.log(`server is listening "http://localhost:5000"`);
});
