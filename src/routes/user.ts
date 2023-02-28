import express from "express";

import * as user from "../controllers/user";
import { authMiddleware } from "../middleware/auth";
import { upload } from "../utils/multer";

export const userRoute = express.Router();

userRoute.get("/users", authMiddleware, user.listUsers);
userRoute.get("/user/:id", authMiddleware, user.getUser);
userRoute.post("/user", user.createUser);
userRoute.put(
  "/user/:id",
  upload.single("image"),
  authMiddleware,
  user.updateUser
);
userRoute.delete("/user/:id", authMiddleware, user.deleteUser);
