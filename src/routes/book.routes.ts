import { Router } from "express";
import { getAllBooks, getSpecificBook, deleteBook, createBook, updateBook } from "../controllers/book.controller";
import middleware from "../middleware/auth.middleware"

const router: Router = Router();

router.post("/", middleware, createBook);
router.get("/", middleware, getAllBooks);
router.get("/:id", middleware, getSpecificBook)
router.delete("/:id", middleware, deleteBook);
router.put("/:id", middleware ,updateBook);

export default router