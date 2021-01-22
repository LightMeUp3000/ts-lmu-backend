export function responseMessageBuilder(statusCode, message, type = "json") {
  if (statusCode === 200) {
    return {
      error: false,
      response: {
        message,
        status: statusCode,
        type,
      },
    };
  } else {
    return {
      error: {
        message,
        status: statusCode,
      },
      response: false,
    };
  }
}
