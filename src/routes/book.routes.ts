import { Router } from "express";
import { getAllBooks, getSpecificBooks, deleteBook, createBook, updateBook } from "../controllers/book.controller";


const router: Router = Router();

router.post("/", createBook);
router.get("/", getAllBooks);
router.get("/:id", getSpecificBooks)
router.delete("/:id", deleteBook);
router.put("/:id", updateBook);

export default router