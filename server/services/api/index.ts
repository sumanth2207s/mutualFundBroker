import { Router } from "express";
import { authRouter } from "../AuthServices/api";

const router = Router()

router.use('/api/auth', authRouter);

export default router