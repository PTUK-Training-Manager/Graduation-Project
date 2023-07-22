import { query } from "express-validator";
import { DEFAULT_PAGE_SIZE } from "../constants";

const validatePagination = () => {
  return [
    query("page")
      .optional()
      .default(0)
      .toInt()
      .isInt({ min: 0 })
      .withMessage("query `page` should be a non-negative integer"),
    query("size")
      .optional()
      .default(DEFAULT_PAGE_SIZE)
      .toInt()
      .isInt({ min: 1, max: 999 })
      .withMessage("query `size` should be an integer between 1 and 999"),
  ];
};

export default validatePagination;
