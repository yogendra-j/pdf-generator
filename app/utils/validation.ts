import { setErrorMap, z, ZodError } from 'zod';
import { createMessageBuilder, fromError } from 'zod-validation-error';
import { GeneratePdfRequest } from '../types/pdf';

const messageBuilder = createMessageBuilder({
  issueSeparator: ' | ',
  includePath: false,
  maxIssuesInMessage: 5,
});

setErrorMap((issue, ctx) => {
  if (issue.code === 'unrecognized_keys') {
    return {
      message: `Unexpected field${
        issue.keys.length > 1 ? 's' : ''
      }: ${issue.keys.join(', ')}`,
    };
  }
  return { message: ctx.defaultError };
});

const pdfRequestSchema = z
  .object({
    url: z
      .string({ message: 'A URL is required' })
      .url({ message: 'Property url must be a valid fully-qualified URL' }),
  })
  .strict();

export const validatePdfRequest = (
  payload: unknown
): payload is GeneratePdfRequest => {
  try {
    pdfRequestSchema.parse(payload);
    return true;
  } catch (error) {
    if (error instanceof ZodError) {
      throw fromError(error, { messageBuilder });
    }
    throw new Error('An error occurred while validating the request');
  }
};
