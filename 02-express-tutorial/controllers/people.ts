let { people } = require("../data");
export const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

export const createPerson = (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name vlaue" });
  }
  res.status(201).json({ success: true, person: name });
};

export const createPersonPostman = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name vlaue" });
  }
  res.status(201).json({ success: true, data: [...people, name] });
};

export const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const person = people.find(person => person.id === Number(id));
  if (!person) {
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
};

export const deletePerson = (req, res) => {
  const { id } = req.params;
  const person = people.find(person => person.id === Number(id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` });
  }
  const newPeople = people.filter(person => person.id !== Number(id));
  return res.status(200).json({ success: true, data: newPeople });
};
