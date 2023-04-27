import multer from "multer";
import path from "path";
import { Request, Response } from "express";

// This middleware checks if the user has uploaded an image and save it in specified directory with specified name.
const storage: any = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/images/"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload: any = multer({ storage: storage });

export default upload;
