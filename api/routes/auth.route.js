import express from 'express';
import { signup, signin, google, signUpUserOrUpdateUser } from '../controllers/auth.controller.js';


const authRouter = express.Router();

authRouter.post("/signup",signup);
authRouter.post("/signin",signin);
authRouter.post("/google",google);
authRouter.post("/saveOrUpdateUser", signUpUserOrUpdateUser);

export default authRouter;
