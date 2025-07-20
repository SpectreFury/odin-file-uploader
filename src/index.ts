import "dotenv/config"

import express from "express";
import cors from "cors";
import session from 'express-session'

const app = express();

import { authRouter } from "./routes/auth.route.ts";
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET!,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
  resave: true,
  saveUninitialized: false
}))

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
