import express from "express";
import cors from "cors";
const app = express();

import { loginRouter } from "./routes/auth.route.ts";
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/auth", loginRouter);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
