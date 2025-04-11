"use client";

import { downloadPdf } from "@/app/services/pdfService";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { useState } from "react";
import PdfPreview from "./PdfPreview";

interface PdfPreviewerProps {
  pdfBlob: Blob | null;
  filename: string;
}

const PdfPreviewer = ({ pdfBlob, filename }: PdfPreviewerProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDownload = () => {
    if (pdfBlob) {
      downloadPdf(pdfBlob, filename);
    }
  };

  if (!pdfBlob) {
    return null;
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTitle className="sr-only">Preview PDF</DialogTitle>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors">
          <Eye size={16} />
          Preview PDF
        </button>
      </DialogTrigger>
      <DialogContent className="flex justify-center items-center bg-white/90 backdrop-blur-sm">
        <PdfPreview
          pdfBlob={pdfBlob}
          onDownload={handleDownload}
          filename={filename}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PdfPreviewer;
