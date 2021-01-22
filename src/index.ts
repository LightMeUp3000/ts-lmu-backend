import * as bodyParser from "body-parser";
import { config } from "dotenv";
import * as express from "express";

import { apiV1Controllers } from "./api/v1/controllers";
config();

export const app = express();

// tslint:disable-next-line
const APP_PORT: number = parseInt( process.env.PORT || '8080' );

app.use(bodyParser.json());

// ATTACH CONTROLLERS VERSIONS
app.use("/v1/", apiV1Controllers);

app.listen(APP_PORT, (): void => {
  // tslint:disable-next-line
  console.log(`Server running on ${process.env.PORT}!`);
});
