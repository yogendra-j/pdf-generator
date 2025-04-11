"use client";

import { downloadPdf } from "@/app/services/pdfService";
import { useState } from "react";
import { usePdfGeneration } from "../hooks/usePdfGeneration";
import PdfPreview from "./PdfPreview";
import UrlForm from "./UrlForm";

const PdfGenerator = () => {
  const [error, setError] = useState<string | null>(null);
  const [filename, setFilename] = useState("download.pdf"); //TODO: Make this dynamic

  const {
    generatePdf,
    isLoading,
    error: pdfError,
    reset,
    pdfBlob,
  } = usePdfGeneration({
    onError: (error) => {
      setError(error.message || "An unknown error occurred");
    },
    onSuccess: (blob) => {
      setFilename("download.pdf");
    },
  });

  const handleGeneratePdf = (url: string) => {
    setError(null);
    reset();
    generatePdf(url);
  };

  const handleDownload = () => {
    if (pdfBlob) {
      downloadPdf(pdfBlob, filename);
    }
  };

  const displayError = error || (pdfError ? pdfError.message : null);

  return (
    <div className="w-full max-w-md">
      <UrlForm onSubmit={handleGeneratePdf} isLoading={isLoading} />

      {displayError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm">{displayError}</p>
        </div>
      )}

      {isLoading && (
        <div className="mt-6 flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500" />
        </div>
      )}

      {pdfBlob && !isLoading && (
        <div className="mt-6">
          <PdfPreview
            pdfBlob={pdfBlob}
            onDownload={handleDownload}
            filename={filename}
          />
        </div>
      )}
    </div>
  );
};

export default PdfGenerator;
