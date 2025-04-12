import { generatePdf } from '@/app/services/pdf-generator';
import { env } from '@/app/utils/env';
import { sanitizeFilename } from '@/app/utils/sanitizeFilename';
import { validatePdfRequest } from '@/app/utils/validation';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    let payload;
    try {
      payload = await req.json();
      validatePdfRequest(payload);
    } catch (error) {
      return NextResponse.json(
        {
          message:
            error instanceof Error ? error.message : 'Unknown error occurred',
        },
        { status: 400 }
      );
    }

    const { pdfStream, title } = await generatePdf(
      payload.url,
      env.BROWSERLESS_TOKEN
    );

    const sanitizedTitle = sanitizeFilename(title);
    const filename = `${sanitizedTitle}.pdf`;

    const response = new NextResponse(pdfStream);

    response.headers.set('Content-Type', 'application/pdf');
    response.headers.set(
      'Content-Disposition',
      `attachment; filename="${filename}"`
    );

    return response;
  } catch (error: unknown) {
    console.error(error);
    return handleError(error);
  }
};

const isRateLimitError = (error: unknown): boolean => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string' &&
    (error as { message: string }).message.includes('429')
  );
};

const getErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : 'Unknown error occurred';
};

const handleError = (error: unknown): NextResponse => {
  if (isRateLimitError(error)) {
    return NextResponse.json(
      {
        message: 'Too many requests. Please try again later.',
      },
      { status: 429 }
    );
  }

  return NextResponse.json(
    {
      message: getErrorMessage(error),
    },
    { status: 500 }
  );
};
