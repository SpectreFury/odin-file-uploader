import { type Request, type Response, type NextFunction } from "express";

import chalk from "chalk";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const date = new Date();

  console.log(
    `${chalk.red(date.toISOString())} ${chalk.yellow(req.method)} ${chalk.green(req.url)}`,
  );

  next();
};
