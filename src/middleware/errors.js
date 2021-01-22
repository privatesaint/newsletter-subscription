import logger from "../config/logger";

const joiErrors = (error) =>
  error.details.map((detail) => detail.message).join(",");

const modelErrors = (error) => {
  const { errors } = error;

  if (error.name === "SequelizeUniqueConstraintError") {
    return errors
      .map((err) => {
        if (err.path.includes(".")) {
          return `${err.path
            .split(".")[1]
            .charAt(0)
            .toUpperCase()}${err.path.split(".")[1].slice(1)} already exist.`;
        } else {
          return `${err.path.charAt(0).toUpperCase()}${err.path.slice(
            1
          )} already exist.`;
        }
      })
      .join(",");
  }

  if (error.name === "SequelizeValidationError") {
    return errors.map((err) => err.message).join(",");
  }
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  logger.error({
    message: err.message,
    status: err.statusCode,
    stack: err.stack,
  });

  // Handling Joi Validation Error
  if (err.details) {
    const errors = joiErrors(err);
    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  // Handling Sequelize Validation Error
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError" ||
    err.name === "SequelizeForeignKeyConstraintError"
  ) {
    const errors = modelErrors(err);
    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  let error = { ...err };
  error.message = err.message;
  res.status(error.statusCode).json({
    success: false,
    message: error.message || "Internal Server Error.",
  });
};
