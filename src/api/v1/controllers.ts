import { Router } from "express";
export const apiV1Controllers: Router = Router();

import { STATUSES } from "../../utils/httpStatuses";

// CONTROLLERS
import {
  postPictureController,
  postPictureValidationMiddleware,
} from "./postPictureController";

apiV1Controllers.get("/test", (req, res): void => {
  res.status(STATUSES.SUCCESS.code).json(STATUSES.SUCCESS.message);
});

apiV1Controllers.post(
  "/postPicture/:format/:w/:h",
  postPictureValidationMiddleware,
  postPictureController
);
