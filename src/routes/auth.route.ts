import { Router } from "express";
import { loginHandler, logoutHandler, meHandler, registerHandler } from "../handlers/auth.handler";

const authRouter = Router();

authRouter.get("/me", meHandler)

authRouter.post("/login", loginHandler);
authRouter.post("/register", registerHandler);
authRouter.post("/logout", logoutHandler)

export { authRouter };
