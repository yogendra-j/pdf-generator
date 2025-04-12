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
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
};
