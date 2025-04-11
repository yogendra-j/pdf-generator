import { Download } from "lucide-react";
import { Button } from "../../../../components/ui/button";

interface PdfHeaderProps {
  filename: string;
  onDownload: () => void;
}

const PdfHeader = ({ filename, onDownload }: PdfHeaderProps) => (
  <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
    <div className="text-gray-700 font-medium">{filename}</div>
    <Button onClick={onDownload} variant="default" className="gap-1">
      <Download size={18} />
      Download
    </Button>
  </div>
);

export default PdfHeader;
