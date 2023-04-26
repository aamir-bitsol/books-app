import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller";
import multer from "multer";
import path from "path";
const router: Router = Router();

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

router.post("/sign-up", upload.single("image"), signUp);
router.post("/sign-in", signIn);

export default router;
