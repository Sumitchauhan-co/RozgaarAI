import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt, { SignOptions } from "jsonwebtoken";

export interface tokenPayload {
  id: string;
  role: "worker" | "recruiter" | "admin";
}

export const generateHashPassword = async (userPassowrd: string) => {
  return bcrypt.hash(userPassowrd, 10);
};

export const compareUserPassword = async (
  userPassword: string,
  hashPassword: string
) => {
  return bcrypt.compare(userPassword, hashPassword);
};

export const generateAccessToken = async (payload: tokenPayload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET_TOKEN!, {
    expiresIn: (process.env.JWT_ACCESS_TOKEN_EXPIRY ||
      "15m") as SignOptions["expiresIn"],
  });
};

export const generateRefreshToken = async (payload: tokenPayload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET_TOKEN!, {
    expiresIn: (process.env.JWT_REFRESH_TOKEN_EXPIRY ||
      "1h") as SignOptions["expiresIn"],
  });
};

export const verifyAccessToken = async (token: string) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET_TOKEN!);
};

export const verifyRefreshToken = async (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET_TOKEN!);
};

export const generateToken = async () => {
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  return { token, hashedToken };
};

export const generateHashedToken = async (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
