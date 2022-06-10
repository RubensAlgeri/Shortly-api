import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import {validaUsuario} from "../middlewares/authSchemaValidationMiddleware.js"

const authRouter = Router();
authRouter.post("/signup", validaUsuario, signUp);
authRouter.post("/signin", signIn);
export default authRouter;