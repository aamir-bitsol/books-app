import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller";
import imageMiddleware from "../middleware/singleImage.middleware";

const router: Router = Router();
router.post("/sign-up", imageMiddleware.single('image'), signUp);
router.post("/sign-in", signIn);

export default router;
