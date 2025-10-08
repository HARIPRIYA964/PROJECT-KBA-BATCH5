import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authenticate = (req, res, next) => {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return res.status(401).send("Unauthorized access");

  const cookies = Object.fromEntries(cookieHeader.split(';').map(c => c.trim().split('=')));
  const token = cookies?.Token;
  if (!token) return res.status(401).send("Unauthorized access");

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.email = verified.email; 
    req.userType = verified.userType;
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
};

export default authenticate;
