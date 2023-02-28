import type { Request, Response } from "express";

import * as UserService from "../services/user";

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.listUsers();
    const length = users.length;
    return res
      .status(200)
      .json({ data: users, length, message: "List of Users Found" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUser(parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.updateUser(
      req.body,
      req.file,
      parseInt(req.params.id)
    );
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.deleteUser(parseInt(req.params.id));
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
