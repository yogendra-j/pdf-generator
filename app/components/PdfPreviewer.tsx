"use client";

import { downloadPdf } from "@/app/services/pdfService";
import PdfPreview from "./PdfPreview";

interface PdfPreviewerProps {
  pdfBlob: Blob | null;
  filename: string;
}

const PdfPreviewer = ({ pdfBlob, filename }: PdfPreviewerProps) => {
  const handleDownload = () => {
    if (pdfBlob) {
      downloadPdf(pdfBlob, filename);
    }
  };

  if (!pdfBlob) {
    return null;
  }

  return (
    <div className="mt-6">
      <PdfPreview
        pdfBlob={pdfBlob}
        onDownload={handleDownload}
        filename={filename}
      />
    </div>
  );
};

export default PdfPreviewer;
