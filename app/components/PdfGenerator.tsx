"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { usePdfGeneration } from "./pdf/hooks/usePdfGeneration";
import UrlForm from "./UrlForm";

interface PdfGeneratorProps {
  onPdfGenerated: (blob: Blob, filename: string) => void;
}

const PdfGenerator = ({ onPdfGenerated }: PdfGeneratorProps) => {
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
    onSuccess: (blob) => {
      onPdfGenerated(blob, "download.pdf");
    },
  });

  const handleGeneratePdf = (url: string) => {
    setError(null);
    reset();
    generatePdf(url);
  };

  const displayError = error || (pdfError ? pdfError.message : null);

  return (
    <div className="w-full">
      <UrlForm onSubmit={handleGeneratePdf} isLoading={isLoading} />

      {displayError && (
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p className="text-destructive text-sm">{displayError}</p>
        </div>
      )}

      {isLoading && (
        <div className="mt-6 flex justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};

export default PdfGenerator;
