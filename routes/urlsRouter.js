import { Router } from 'express';
import { buscarUrl, deletarUrl, postarUrl, redirecionar } from '../controllers/urlsController.js';
import { validaToken } from '../middlewares/authMiddleware.js';

const urlsRouter = Router();
urlsRouter.post("/urls/shorten", validaToken, postarUrl);
urlsRouter.get("/urls/:id", buscarUrl);
urlsRouter.get("/urls/open/:shortUrl", redirecionar)
urlsRouter.delete("/urls/:id", validaToken, deletarUrl)
export default urlsRouter;