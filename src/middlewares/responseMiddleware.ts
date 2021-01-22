export function initResponseMiddleware(req, res, next) {
  req.responseMessage = {
    error: false,
    response: false,
  };

  next();
}

export function sendResponseMiddleware(req, res) {
  const responseMessage = req.responseMessage;

  // responses 2** OK
  if (!responseMessage.error) {
    if (responseMessage.response.type === "json") {
      res
        .status(responseMessage.response.status)
        .json(responseMessage.response.message);
    } else {
      res
        .status(responseMessage.response.status)
        .send(responseMessage.response.message);
    }
  }
  // catch error messages
  else {
    res
      .status(responseMessage.error.status)
      .send(responseMessage.error.message);
  }
}
