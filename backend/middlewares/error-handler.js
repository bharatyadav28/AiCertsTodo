const ErrorHandlerMiddlerware = (error, req, res, next) => {
  console.log(error);
  const customError = {
    message: error.message || "Internal server error",
    statusCode: error.statusCode || 500,
  };
  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

export default ErrorHandlerMiddlerware;
