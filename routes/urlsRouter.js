import { Router } from 'express';
import { buscarUrl, postarUrl } from '../controllers/urlsController.js';
import { validaToken } from '../middlewares/authMiddleware.js';

const urlsRouter = Router();
urlsRouter.post("/urls/shorten", validaToken, postarUrl);
urlsRouter.get("/urls/:id", buscarUrl)
export default urlsRouter;