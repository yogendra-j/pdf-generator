import PdfApp from "@/app/components/pdf/components/PdfApp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | PDF Generator",
  description: "Generate PDF from URL.",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-lg mx-auto rounded-xl border border-border/50 bg-card/60 shadow-xl backdrop-blur-md p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />

        <div className="relative z-10 min-h-80">
          <h1 className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PDF Generator
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Enter a URL below to generate a PDF of the webpage
          </p>

          <PdfApp />
        </div>
      </div>
    </main>
  );
}
