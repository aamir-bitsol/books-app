import { Router } from "express";
import {
  getAllBooks,
  getSpecificBook,
  deleteBook,
  createBook,
  updateBook,
} from "../controllers/book.controller";
import Authenticate from "../middleware/auth.middleware";

const router: Router = Router();

router.get("/", Authenticate, getAllBooks);
router.post("/", Authenticate, createBook);
router.get("/:id", Authenticate, getSpecificBook);
router.delete("/:id", Authenticate, deleteBook);
router.put("/:id", Authenticate, updateBook);

export default router;
