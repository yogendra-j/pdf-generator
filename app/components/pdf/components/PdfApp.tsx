'use client';

import PdfGenerator from '@/app/components/pdf/components/PdfGenerator';
import PdfPreviewer from '@/app/components/pdf/components/PdfPreviewer';
import { useState } from 'react';

const PdfApp = () => {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [filename, setFilename] = useState<string>('download.pdf');
  const [autoPreview, setAutoPreview] = useState(false);

  const handlePdfGenerated = (blob: Blob | null, name: string) => {
    setPdfBlob(blob);
    setFilename(name);
    setAutoPreview(true);
  };

  const handlePreviewClosed = () => {
    setAutoPreview(false);
  };

  return (
    <div className="w-full h-full">
      <PdfGenerator onPdfGenerated={handlePdfGenerated} />
      {pdfBlob && (
        <PdfPreviewer
          pdfBlob={pdfBlob}
          filename={filename}
          autoOpen={autoPreview}
          onDialogClose={handlePreviewClosed}
        />
      )}
    </div>
  );
};

export default PdfApp;
