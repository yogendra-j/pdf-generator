import { z } from "zod";
import { errorMap } from "zod-validation-error";
import { GeneratePdfRequest } from "../types/pdf";
const pdfRequestSchema = z
  .object({
    url: z.string().url("Property url must be a valid fully-qualified URL"),
  })
  .strict({
    message: "Unexpected property provided",
  });

export const validatePdfRequest = (
  payload: unknown
): payload is GeneratePdfRequest => {
  z.setErrorMap(errorMap);
  pdfRequestSchema.parse(payload);
  return true;
};
