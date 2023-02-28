import { db } from "../utils/db.server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface User {
  id: number;
  email: string;
  password: string;
  name?: string | null;
  address?: string | null;
  phone?: string | null;
  image?: string | null;
}

export interface LoginResult {
  user: User;
  token: string;
}

export const register = async (user: Omit<User, "id">): Promise<User> => {
  const { email, password, name } = user;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const existingUser = await db.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }

  return await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: "USER",
    },
    select: {
      id: true,
      email: true,
      password: true,
      name: true,
    },
  });
};

export const login = async (
  email: string,
  password: string
): Promise<LoginResult> => {
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  console.log(token);

  return { user, token };
};
