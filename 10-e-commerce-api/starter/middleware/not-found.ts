import express from "express";
const notFound = (req: any, res: express.Response) =>
  res.status(404).send("Route does not exist");

export default notFound;
