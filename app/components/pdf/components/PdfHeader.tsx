import { Download } from "lucide-react";

interface PdfHeaderProps {
  filename: string;
  onDownload: () => void;
}

const PdfHeader = ({ filename, onDownload }: PdfHeaderProps) => (
  <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
    <div className="text-gray-700 font-medium">{filename}</div>
    <button
      onClick={onDownload}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
    >
      <Download size={18} />
      Download
    </button>
  </div>
);

export default PdfHeader;
