const EventEmitter = require("events");

const customEmitter = new EventEmitter();

customEmitter.on("response", (name: string, id: number) => {
  console.log(`data recieved ${name} with id: ${id}`);
});
customEmitter.on("response", () => {
  console.log(`some other logic`);
});

customEmitter.emit("response", "john", 34);
