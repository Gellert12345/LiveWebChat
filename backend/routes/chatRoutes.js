import express from "express";
import {accessChat , fetchChats , createGroupChat , renameGroup , addToGroupChat , removeFromGroup} from "../controllers/chatControllers.js";
import {protect} from "../middlewares/authMiddleware.js";



const router = express.Router();

router.route("/").post(protect,accessChat); //belépés a chatbe vagy létrehozás
router.route("/").get(protect,fetchChats);//get all chat from database which one is ...
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroupChat);

export default router;