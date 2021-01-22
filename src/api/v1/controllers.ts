// V1 OF ts-lmu-backend API CONTROLLERS

import { Router } from "express";
export const apiV1Controllers: Router = Router();

import { STATUSES } from "../../utils/httpStatuses";

// CONTROLLERS IMPORT
import {
  postPictureController,
  postPictureUrl,
  postPictureValidationMiddleware,
} from "./postPictureController";

// API TEST SIMPLE CONTROLLER
apiV1Controllers.get("/test", (req, res): void => {
  res.status(STATUSES.SUCCESS.code).json(STATUSES.SUCCESS.message);
});

// CONTROLLERS DECLARATIONS
apiV1Controllers.post(
  postPictureUrl,
  postPictureValidationMiddleware,
  postPictureController
);
