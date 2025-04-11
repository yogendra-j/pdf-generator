import axios from "axios";

const API_BASE_URL = "/api";

export const generatePdfFromUrl = async (url: string): Promise<Blob> => {
  try {
    return await axios.post(
      `${API_BASE_URL}/generate-pdf`,
      { url },
      {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data instanceof Blob) {
      const text = await error.response.data.text();
      const json = JSON.parse(text);
      throw new Error(json.message);
    } else {
      throw new Error("Unexpected error");
    }
  }
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
