import { Router } from "express";
import { getAllBooks, getSpecificBook, deleteBook, createBook, updateBook } from "../controllers/book.controller";
import middleware from "../middleware/auth.middleware"

const router: Router = Router();

router.use("/", middleware);

router.post("/", createBook);
router.get("/", getAllBooks);
router.get("/:id", getSpecificBook)
router.delete("/:id", deleteBook);
router.put("/:id", updateBook);

export default router