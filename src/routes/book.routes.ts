import { Router } from "express";
import {
  getAllBooks,
  getSpecificBook,
  deleteBook,
  createBook,
  updateBook,
} from "../controllers/book.controller";
import authMiddleware from "../middleware/auth.middleware";

const router: Router = Router();

router.get("/", authMiddleware, getAllBooks);
router.post("/", authMiddleware, createBook);
router.get("/:id", authMiddleware, getSpecificBook);
router.delete("/:id", authMiddleware, deleteBook);
router.put("/:id", authMiddleware, updateBook);

export default router;
