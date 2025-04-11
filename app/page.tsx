import { Metadata } from "next";
import PdfApp from "./components/PdfApp";

export const metadata: Metadata = {
  title: "Home | PDF Generator",
  description: "Generate PDF from URL.",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">PDF Generator</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Enter a URL below to generate a PDF of the webpage
        </p>

        <PdfApp />
      </div>
    </main>
  );
}
