import { db } from "../utils/db.server";
import bcrypt from "bcrypt";

interface User {
  id: number;
  email: string;
  password: string;
  name?: string | null;
  address?: string | null;
  phone?: string | null;
  image?: string | null;
  files?: any;
  role: "ADMIN" | "USER";
}

export const listUsers = async (): Promise<User[]> => {
  return await db.user.findMany({
    select: {
      id: true,
      email: true,
      password: true,
      name: true,
      address: true,
      phone: true,
      role: true,
    },
  });
};

export const getUser = async (id: number): Promise<User | null> => {
  return await db.user.findUnique({
    where: { id },
  });
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const { email, password, name, address, phone, role } = user;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      address,
      phone,
      role,
    },
    select: {
      id: true,
      email: true,
      password: true,
      name: true,
      address: true,
      phone: true,
      role: true,
    },
  });
};

export const updateUser = async (
  user: Omit<User, "id">,
  image: any,
  id: number
): Promise<User> => {
  const findUnique = await db.user.findUnique({
    where: { id },
  });

  if (!findUnique) {
    throw new Error("User not found");
  }

  const { email, password, name, address, phone, role } = user;
  console.log(image);
  return await db.user.update({
    where: { id },
    data: {
      email,
      password,
      name,
      address,
      phone,
      role,
    },
  });
};

export const deleteUser = async (id: number): Promise<User> => {
  return await db.user.delete({
    where: { id },
  });
};
