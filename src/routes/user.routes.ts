import { Router } from "express";
import { getAllUsers, getSpecificUser, deleteUser, updateUser } from "../controllers/user.controller";


const router: Router = Router();

router.get("/", getAllUsers);
router.get("/:id", getSpecificUser)
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);


export default router;
