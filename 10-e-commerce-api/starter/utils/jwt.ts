import jwt from "jsonwebtoken";

const createJWT = ({ payload }: any) => {
  const secret = process.env.JWT_SECRET;
  if (secret) {
    const token = jwt.sign(payload, secret, {
      expiresIn: process.env.JWT_LIFETIME,
    });
    return token;
  }
};

const isTokenValid = (token: string) => {
  const secret = process.env.JWT_SECRET;
  if (secret) {
    jwt.verify(token, secret);
  }
};

export { createJWT, isTokenValid };
