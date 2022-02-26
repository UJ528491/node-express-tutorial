import express from "express";
const register = async (req: any, res: express.Response) => {
  res.send("register user");
};
const login = async (req: any, res: express.Response) => {
  res.send("login user");
};
const logout = async (req: any, res: express.Response) => {
  res.send("logout user");
};

export { register, login, logout };
