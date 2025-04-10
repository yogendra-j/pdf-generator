import axios from "axios";

const API_BASE_URL = "/api";

export const generatePdfFromUrl = async (url: string): Promise<Blob> => {
  const response = await axios.post(
    `${API_BASE_URL}/generate-pdf`,
    { url },
    {
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const downloadPdf = (blob: Blob, filename = "download.pdf"): void => {
  const fileUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(fileUrl);
};
