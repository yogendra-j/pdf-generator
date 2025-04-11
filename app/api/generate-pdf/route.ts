import { generatePdf } from "@/app/services/pdf-generator";
import { ErrorResponse } from "@/app/types/pdf";
import { env } from "@/app/utils/env";
import { validatePdfRequest } from "@/app/utils/validation";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    let payload;
    try {
      payload = await req.json();
      validatePdfRequest(payload);
    } catch (error) {
      return NextResponse.json(error, { status: 400 });
    }

    const pdfStream = await generatePdf(payload.url, env.BROWSERLESS_TOKEN);

    const response = new NextResponse(pdfStream);

    response.headers.set("Content-Type", "application/pdf");
    response.headers.set(
      "Content-Disposition",
      `attachment; filename="download.pdf"`
    );

    return response;
  } catch (error) {
    console.error(error);
    const errorResponse: ErrorResponse = {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
};
