import { Router } from "express";
import { getAllBooks, getSpecificBooks, deleteBook, createBook, updateBook } from "../controllers/book.controller";
import { verify } from "jsonwebtoken";

const router: Router = Router();

router.use((req, res, next)=>{
    const token = req.headers['authorization'];
    if(token){
        try{
            const secret_key: string = process.env.MY_SECRET_KEY as string;
            verify(token, secret_key);
            next();
        }
        catch(err){
            return res.status(400).send({"message": "Invalid Token"})
        }
    }
    else{
        res.status(401).send({message: "Please send token in headers."})
    }
})


router.post("/", createBook);
router.get("/", getAllBooks);
router.get("/:id", getSpecificBooks)
router.delete("/:id", deleteBook);
router.put("/:id", updateBook);

export default router