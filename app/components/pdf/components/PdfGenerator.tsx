'use client';

import UrlForm from '@/app/components/pdf/components/UrlForm';
import { usePdfGeneration } from '@/app/components/pdf/hooks/usePdfGeneration';
import axios from 'axios';

interface PdfGeneratorProps {
  onPdfGenerated: (blob: Blob | null, filename: string) => void;
}

const PdfGenerator = ({ onPdfGenerated }: PdfGeneratorProps) => {
  const { generatePdf, isLoading, reset, error } = usePdfGeneration({
    onSuccess: response => {
      onPdfGenerated(response.blob, response.filename);
    },
  });

  const handleGeneratePdf = (url: string) => {
    onPdfGenerated(null, '');
    reset();
    generatePdf(url);
  };

  return (
    <div className="w-full">
      <UrlForm onSubmit={handleGeneratePdf} isLoading={isLoading} />

      {error && (
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p className="text-destructive text-sm">
            {axios.isAxiosError(error)
              ? error.response?.data.message
              : error.message}
          </p>
        </div>
      )}
    </div>
  );
};

export default PdfGenerator;
