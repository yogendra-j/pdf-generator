"use client";

import { LinkIcon, Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

interface UrlFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const UrlForm = ({ onSubmit, isLoading }: UrlFormProps) => {
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      new URL(url);
    } catch (error) {
      setError("Please enter a valid URL");
      return;
    }

    setError(null);
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="mb-5">
        <Label htmlFor="url" className="mb-2 text-foreground/90 font-medium">
          Enter a URL to generate PDF
        </Label>
        <div className="relative mt-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground/70">
            <LinkIcon size={18} />
          </div>
          <Input
            id="url"
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={`pl-10 h-11 ${
              error
                ? "border-destructive"
                : "border-input focus:border-primary/50"
            }`}
            disabled={isLoading}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-destructive"></span>
            {error}
          </p>
        )}
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 font-medium"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating PDF...
          </>
        ) : (
          "Generate PDF"
        )}
      </Button>
    </form>
  );
};

export default UrlForm;
