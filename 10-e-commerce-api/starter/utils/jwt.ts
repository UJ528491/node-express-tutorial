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

const attachCookiesToResponse = ({ res, user }: any) => {
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });
};

export { createJWT, isTokenValid, attachCookiesToResponse };
