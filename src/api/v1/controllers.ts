// V1 OF ts-lmu-backend API CONTROLLERS

import { Router } from "express";
export const apiV1Controllers: Router = Router();

import { STATUSES } from "../../utils/httpStatuses";

// CONTROLLERS IMPORT
import {
  pictureController,
  pictureUrl,
  pictureValidationMiddleware,
} from "./pictureController";

// API TEST SIMPLE CONTROLLER
apiV1Controllers.get("/test", (req, res): void => {
  res.status(STATUSES.SUCCESS.code).json(STATUSES.SUCCESS.message);
});

// CONTROLLERS DECLARATIONS
apiV1Controllers.post(
  pictureUrl,
  pictureValidationMiddleware,
  pictureController
);
