import express from "express";
import {
  createUser,
  login,
  logout,
  getUserProfile,
  getUser
} from "../controllers/userControllers.js";


const router = express.Router();


router.post("/createuser",createUser)
router.post("/login",login)
router.post("/logout",logout)
router.get("/getuserprofile", getUserProfile);
router.get("/getuser/:id", getUser);

export default router;