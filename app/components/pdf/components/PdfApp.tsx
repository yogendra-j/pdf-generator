"use client";

import PdfGenerator from "@/app/components/pdf/components/PdfGenerator";
import PdfPreviewer from "@/app/components/pdf/components/PdfPreviewer";
import { useState } from "react";

const PdfApp = () => {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [filename, setFilename] = useState<string>("download.pdf");

  const handlePdfGenerated = (blob: Blob | null, name: string) => {
    setPdfBlob(blob);
    setFilename(name);
  };

  return (
    <div className="w-full max-w-md">
      <PdfGenerator onPdfGenerated={handlePdfGenerated} />
      {pdfBlob && <PdfPreviewer pdfBlob={pdfBlob} filename={filename} />}
    </div>
  );
};

export default PdfApp;
