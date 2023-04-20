import { Router } from "express";
import { getAllBooks, getSpecificBook, deleteBook, createBook, updateBook } from "../controllers/book.controller";
import middleware from "../middleware/auth.middleware"
import passport from "../passport/strategy";

const router: Router = Router();

router.post("/", passport.authenticate("jwt", {session: false}), createBook);
router.get("/", passport.authenticate("jwt", {session: false}), getAllBooks);
router.get("/:id", passport.authenticate("jwt", {session: false}), getSpecificBook)
router.delete("/:id", passport.authenticate("jwt", {session: false}), deleteBook);
router.put("/:id", passport.authenticate("jwt", {session: false}), updateBook);

export default router