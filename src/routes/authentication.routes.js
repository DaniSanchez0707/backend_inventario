import { Router } from "express";
import { registroUsuario, login } from "../controllers/authenticationController.js";
const router = Router()


router.post('/login', login ) 
router.post('/register', registroUsuario ) 

export default router