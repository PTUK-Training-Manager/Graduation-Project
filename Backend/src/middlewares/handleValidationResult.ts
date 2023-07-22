import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const handleValidationResult = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("handleValidationResult");

  // Extract the validation errors of an express request
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });

  // else, then the request passed the validation test:
  next(); //pass the request to its next stage
};

export default handleValidationResult;
