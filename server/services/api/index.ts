import { Router } from "express";
import { authRouter } from "../AuthServices/api";
import { fundRouter } from "../FundServices/api";
import { portfolioRoutes } from "../PortfolioServices/api";

const router = Router()

router.use('/api/auth', authRouter);
router.use('/api/fund', fundRouter);
router.use('/api/portfolio', portfolioRoutes);

export default router