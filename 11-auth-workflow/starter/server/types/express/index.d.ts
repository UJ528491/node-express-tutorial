import express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
    interface Response {
      user: { userId: string };
    }
  }
}
