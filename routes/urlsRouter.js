import { Router } from 'express';
import { postarUrl } from '../controllers/urlsController.js';
import { validaToken } from '../middlewares/authMiddleware.js';

const urlsRouter = Router();
urlsRouter.post("/urls/shorten", validaToken, postarUrl);
export default urlsRouter;