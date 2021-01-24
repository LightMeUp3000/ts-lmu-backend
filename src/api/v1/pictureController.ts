import { PicturesService } from "../../services/picturesService";
import { STATUSES } from "../../utils/httpStatuses";
import { responseMessageBuilder } from "../../utils/responseMessageBuilder";

// Controller url path
export const pictureUrl = "/picture/:format/:w/:h";

// Main controller method
export async function pictureController(req, res, next) {
  if (!req.responseMessage.error) {
    const params = req.params.parsed;
    const imageDataString = params.body.image.split(";base64,").pop();
    const imageFormat = params.format;

    try {
      const picture = new PicturesService(imageDataString, imageFormat);
      const pictureColors = await picture.getColors();

      req.responseMessage = responseMessageBuilder(
        STATUSES.SUCCESS.code,
        pictureColors
      );
    } catch (e) {
      // tslint:disable-next-line
      console.log("Error: ", e);
      req.responseMessage = responseMessageBuilder(
        STATUSES.INTERNAL_ERROR.code,
        STATUSES.INTERNAL_ERROR.message
      );
    }
  }
  next();
}

// Controller middlewares
export function pictureValidationMiddleware(req, res, next) {
  const body = req.body;

  const format = req.params.format;
  const width = parseInt(req.params.w, 10);
  const height = parseInt(req.params.h, 10);

  if (format !== "png" && format !== "jpg") {
    req.responseMessage = responseMessageBuilder(
      STATUSES.BAD_REQUEST.code,
      `${STATUSES.BAD_REQUEST.message} | :format should be 'png' or 'jpg'`
    );
  } else if (!width && width > 0 && width < 1920) {
    req.responseMessage = responseMessageBuilder(
      STATUSES.BAD_REQUEST.code,
      `${STATUSES.BAD_REQUEST.message} | :w should be INT higher then 0 and lower then 1920`
    );
  } else if (!height && height > 0 && height < 1080) {
    req.responseMessage = responseMessageBuilder(
      STATUSES.BAD_REQUEST.code,
      `${STATUSES.BAD_REQUEST.message} | :h should be INT higher then 0 and lower then 1080`
    );
  } else if (!(typeof body === "object" && typeof body.image === "string")) {
    req.responseMessage = responseMessageBuilder(
      STATUSES.BAD_REQUEST.code,
      `${STATUSES.BAD_REQUEST.message} | image no exist on body`
    );
  } else {
    req.params.parsed = {
      body,
      format,
      height,
      width,
    };
  }
  next();
}
