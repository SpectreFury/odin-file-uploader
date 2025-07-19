import { Router } from "express";
import { loginHandler, registerHandler } from "../handlers/auth.handler";

const loginRouter = Router();

loginRouter.post("/login", loginHandler);
loginRouter.post("/register", registerHandler);

export { loginRouter };
