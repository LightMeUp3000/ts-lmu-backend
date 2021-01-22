import { Router } from "express";
export const apiV1Controllers: Router = Router();

const STATUS_SUCCESSS = 200;

apiV1Controllers.get("/test", (req, res): void => {
  res.status(STATUS_SUCCESSS).send("API TEST OK");
});
