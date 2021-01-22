import Joi from "@hapi/joi";
import catchAsyncError from "../middleware/catchAsyncError";

export default catchAsyncError(async (req, res, next) => {
  const data = req.body;

  const requestSchema = Joi.object({
    email: Joi.string().email().trim().required().messages({
      "string.email": "Not a valid email",
      "string.base": "Not a valid email",
      "string.empty": "Email field is required",
      "any.required": "Email field is required",
    }),
  });

  const validatedData = await requestSchema.validateAsync(data);

  if (validatedData) {
    next();
  }
});
