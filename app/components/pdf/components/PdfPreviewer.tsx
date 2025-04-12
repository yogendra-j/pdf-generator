'use client';

import { downloadPdf } from '@/app/services/pdfService';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Download, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import PdfPreview from './PdfPreview';

interface PdfPreviewerProps {
  pdfBlob: Blob | null;
  filename: string;
  autoOpen?: boolean;
  onDialogClose?: () => void;
}

const PdfPreviewer = ({
  pdfBlob,
  filename,
  autoOpen = false,
  onDialogClose,
}: PdfPreviewerProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (autoOpen && pdfBlob) {
      setDialogOpen(true);
    }
  }, [autoOpen, pdfBlob]);

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open && onDialogClose) {
      onDialogClose();
    }
  };

  const handleDownload = () => {
    if (pdfBlob) {
      downloadPdf(pdfBlob, filename);
    }
  };

  if (!pdfBlob) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-6 sm:mt-8 w-full h-full">
      <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
        <DialogTitle className="sr-only">Preview PDF</DialogTitle>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex-1 gap-1 sm:gap-2 text-sm sm:text-base h-10 sm:h-11 border-primary/20 bg-primary/5 hover:bg-primary/10"
          >
            <Eye size={16} className="sm:size-[18px] text-primary" />
            Preview PDF
          </Button>
        </DialogTrigger>
        <DialogContent className="flex justify-center items-center bg-card/10 backdrop-blur-md w-[calc(100%-32px)] max-w-none sm:max-w-4xl lg:max-w-6xl p-0 sm:p-0 max-h-[90vh] sm:max-h-[90vh] overflow-auto">
          <PdfPreview
            pdfBlob={pdfBlob}
            onDownload={handleDownload}
            filename={filename}
          />
        </DialogContent>
      </Dialog>
      <Button
        onClick={handleDownload}
        variant="default"
        className="flex-1 gap-1 sm:gap-2 text-sm sm:text-base h-10 sm:h-11"
      >
        <Download size={16} className="sm:size-[18px]" />
        Download PDF
      </Button>
    </div>
  );
};

export default PdfPreviewer;
