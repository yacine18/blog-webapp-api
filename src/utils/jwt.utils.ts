import jwt from 'jsonwebtoken';

const privateKey = `@THKJ1453@@@!!##~~`;
const publicKey = `@THKJ1453@@@!!##~~`;

export const signJwt = (payload: string) => {
  return jwt.sign({payload}, privateKey, {expiresIn:"1d"});
};

export const decode = (token: string) => {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, publicKey);

    return decoded;
  } catch (error) {
    console.log('error', error.message);
    return null;
  }
};
