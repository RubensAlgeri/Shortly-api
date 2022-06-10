import { Router } from 'express';
import { buscarUsuario } from '../controllers/usersController.js';
import { validaToken } from '../middlewares/authMiddleware.js';

const usersRouter = Router();
usersRouter.get("/users/:id",validaToken, buscarUsuario);
// usersRouter.get("/urls/open/:shortUrl", redirecionar)
export default usersRouter;