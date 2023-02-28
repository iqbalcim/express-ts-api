import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

import { userRoute } from "./routes/user";
import { authRoute } from "./routes/auth";
import bodyParser from "body-parser";
import path from "path";

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT, 10);

const app = express();

app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use("/api/v1", userRoute, authRoute);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
