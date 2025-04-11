import { z } from "zod";
import { GeneratePdfRequest, ValidationError } from "../types/pdf";

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
  const result = pdfRequestSchema.safeParse(payload);

  if (result.success) {
    return true;
  }

  const errors: ValidationError[] = result.error.issues.map((issue) => {
    const path = issue.path.join(".");
    return {
      message: issue.message,
      ...(path ? { property: path } : {}),
    };
  });

  const formattedError = new Error("Validation failed");
  formattedError.name = "ValidationError";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (formattedError as any).errors = errors;

  throw formattedError;
};
