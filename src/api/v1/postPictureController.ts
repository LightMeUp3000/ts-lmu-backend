import { STATUSES } from "../../utils/httpStatuses";

// Controller url path
export const postPictureUrl = "/postPicture/:format/:w/:h";

// Main controller method
export function postPictureController(req, res) {
  const params = req.params.parsed;

  res.status(STATUSES.SUCCESS.code).json(params);
}

// Controller middlewares
export function postPictureValidationMiddleware(req, res, next) {
  const body = req.body;

  const format = req.params.format;
  const width = parseInt(req.params.w, 10);
  const height = parseInt(req.params.h, 10);

  if (format !== "png" && format !== "jpg") {
    res
      .status(STATUSES.BAD_REQUEST.code)
      .send(
        `${STATUSES.BAD_REQUEST.message} | :format should be 'png' or 'jpg'`
      );
  } else if (!width && width > 0 && width < 1920) {
    res
      .status(STATUSES.BAD_REQUEST.code)
      .send(
        `${STATUSES.BAD_REQUEST.message} | :w should be INT higher then 0 and lower then 1920`
      );
  } else if (!height && height > 0 && height < 1080) {
    res
      .status(STATUSES.BAD_REQUEST.code)
      .send(
        `${STATUSES.BAD_REQUEST.message} | :h should be INT higher then 0 and lower then 1080`
      );
  } else if (!(typeof body === "object" && typeof body.image === "string")) {
    res
      .status(STATUSES.BAD_REQUEST.code)
      .send(`${STATUSES.BAD_REQUEST.message} | image no exist on body`);
  } else {
    req.params.parsed = {
      body,
      format,
      height,
      width,
    };

    next();
  }
}
