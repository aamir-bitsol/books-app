import * as bodyParser from "body-parser";
import { Router } from "express";
import { getAllBooks, getSpecificBooks, deleteBook, createBook, updateBook } from "../controllers/books.controller";


const router: Router = Router();

// using json parser
router.use(bodyParser.json());

// post request to create new books
router.post("/", createBook);
router.get("/", getAllBooks);
router.get("/:id", getSpecificBooks)
router.delete("/:id", deleteBook);
router.put("/:id", updateBook);


module.exports = router;
