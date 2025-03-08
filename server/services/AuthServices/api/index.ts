import { Router } from "express";
import { validation } from "../../../shared/validationSchema/validations";
import { userLoginSchema } from "../validations/userLoginSchema";
import { userRegisterSchema } from "../validations/userRegisterSchema";
import { userRegister } from "../controllers/userRegister";
import { userLogin } from "../controllers/userLogin";

const router = Router();

router.post("/register", validation(userRegisterSchema.body), userRegister);

router.post("/login", validation(userLoginSchema.body), userLogin);


export const authRouter = router