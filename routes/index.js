import { Router } from "express";

import authRouter from "./authRouter.js"
import urlsRouter from "./urlsRouter.js"
import usersRouter from "./usersRouter.js"
import rankRouter from "./rankRouter.js"

const router = Router();
router.use(authRouter);
router.use(urlsRouter);
router.use(usersRouter);
router.use(rankRouter);

export default router;