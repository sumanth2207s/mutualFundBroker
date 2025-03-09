import { Router } from "express";
import { authValidation } from "../../../shared/helper/authValidation";
import { getAMCs } from "../controllers/getAMCs";
import { getOpenEndedSchemes } from "../controllers/getOpenEndedSchemes";
import { getSchemeDetails } from "../controllers/getSchemeDetails";

const router = Router()

router.get('/', authValidation, getAMCs);
router.get('/schemes/:amcUuid', authValidation, getOpenEndedSchemes);
router.get('/details/:schemeCode', authValidation, getSchemeDetails);


export const fundRouter = router