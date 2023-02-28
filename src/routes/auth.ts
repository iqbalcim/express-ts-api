import express from "express";

import * as Auth from "../controllers/auth";

export const authRoute = express.Router();

authRoute.post("/register", Auth.register);
authRoute.post("/login", Auth.login);
