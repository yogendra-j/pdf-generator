"use client";

import { useState } from "react";
import { usePdfGeneration } from "../hooks/usePdfGeneration";
import UrlForm from "./UrlForm";

const PdfGenerator = () => {
  const [error, setError] = useState<string | null>(null);

  const {
    generatePdf,
    isLoading,
    error: pdfError,
    reset,
  } = usePdfGeneration({
    onError: (error) => {
      setError(error.message || "An unknown error occurred");
    },
  });

  const handleGeneratePdf = (url: string) => {
    setError(null);
    reset();
    generatePdf(url);
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
    </div>
  );
};

export default PdfGenerator;
