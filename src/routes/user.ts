import { Router } from "express";
import { getAllUsers, getSpecificUser, deleteUser, createUser, updateUser } from "../controllers/user.controller";


const router: Router = Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getSpecificUser)
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);


module.exports = router;
