import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as AuthService from "../services/auth";

export const register = async (req: Request, res: Response) => {
  try {
    await body("email").isEmail().run(req);
    await body("password").isLength({ min: 8 }).run(req);
    await body("name").isLength({ max: 50 }).optional().run(req);
    await body("role").isIn(["ADMIN", "USER"]).run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Validation error: " + JSON.stringify(errors.array()));
    }
    const user = await AuthService.register(req.body);
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.login(req.body.email, req.body.password);
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
