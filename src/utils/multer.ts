import multer from "multer";
import { Request, Response } from "express";

export const multerStorage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req: Request, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

export const multerFileFilter = (req: Request, file: any, cb: any) => {
  const mimeType = ["image/png", "image/jpeg", "video/mp4"];

  if (!file) {
    cb(null, true);
  }

  if (!mimeType.includes(file.mimetype)) {
    cb(new Error(`${file.mimetype} file is not supported!`));
    return;
  }

  cb(null, true);
};

export const upload = multer({
  storage: multerStorage,
  fileFilter: multerFileFilter,
  limits: { fileSize: 1024 * 1024 * 10 }, // 10MB
});
