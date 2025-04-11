"use client";

import { useState } from "react";
import PdfGenerator from "./PdfGenerator";
import PdfPreviewer from "./PdfPreviewer";

const PdfApp = () => {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [filename, setFilename] = useState<string>("download.pdf");

  const handlePdfGenerated = (blob: Blob, name: string) => {
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
