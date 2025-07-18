import "dotenv/config"

const PORT = process.env.PORT || 4000;

import express from 'express'
const app = express();

app.get("/", (req, res) => {
  res.sendStatus(200).json({message: "/ is working properly"})
})

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
})

