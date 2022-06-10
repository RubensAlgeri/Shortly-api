import { Router } from 'express';
import { ranquearUsuarios } from '../controllers/rankController.js';


const rankRouter = Router();
rankRouter.get("/ranking", ranquearUsuarios);
export default rankRouter;