import { Router } from "express";
import { loginHandler, logoutHandler, registerHandler } from "../handlers/auth.handler";

const authRouter = Router();

authRouter.post("/login", loginHandler);
authRouter.post("/register", registerHandler);
authRouter.post("/logout", logoutHandler)

export { authRouter };
