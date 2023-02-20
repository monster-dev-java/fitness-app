sendErrorResponse = (res, code, errorMessage, exception = null) =>
  res.status(code).send({
    status: false,
    error: exception?.toString(),
    exception: errorMessage,
  });

sendSuccessResponse = (res, code, data, message = "Successful") =>
  res.status(code).send({
    status: true,
    data,
    message,
  });

module.exports = {
  sendErrorResponse,
  sendSuccessResponse,
};
