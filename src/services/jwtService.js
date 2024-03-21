import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtService = {
  generateAccessToken: (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    });
  },
  generateRefreshToken: (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  },
  verifyAccessToken: (accessToken) => {
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  },
};

export default jwtService;
