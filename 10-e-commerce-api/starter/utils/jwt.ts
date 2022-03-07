import jwt from "jsonwebtoken";

interface tokenUser {
  name: string;
  userId: string;
  role: string;
}

const createJWT = ({ payload }: any) => {
  const secret = process.env.JWT_SECRET;
  if (secret) {
    const token = jwt.sign(payload, secret, {
      expiresIn: process.env.JWT_LIFETIME,
    });
    return token;
  }
};

const isTokenValid = ({ token }: any): any => {
  const secret = process.env.JWT_SECRET;
  if (secret) {
    return jwt.verify(token, secret);
  }
};

const attachCookiesToResponse = ({ res, user }: any) => {
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

export { createJWT, isTokenValid, attachCookiesToResponse };
