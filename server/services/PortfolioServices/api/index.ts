import { Router } from "express";
import { authValidation } from "../../../shared/helper/authValidation";
import { getPortfolio } from "../controllers/getPortfolio";
import { investInScheme } from "../controllers/investInScheme";
import { updatePortfolioValue } from "../controllers/updatePortfolioValue";

const router = Router()

router.get('/', authValidation, getPortfolio);
router.post('/invest', authValidation, investInScheme);
router.put('/update-value', authValidation, updatePortfolioValue);

export const portfolioRoutes = router