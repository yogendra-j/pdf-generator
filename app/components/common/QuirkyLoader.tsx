"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingMessage {
  text: string;
  emoji: string;
}

const funnyLoadingMessages: LoadingMessage[] = [
  { text: "Turning pixels into paper", emoji: "🖼️" },
  { text: "Converting web to dead trees", emoji: "🌲" },
  { text: "Asking the internet nicely to pose for a picture", emoji: "📸" },
  { text: "Squeezing the internet into a PDF", emoji: "🤏" },
  { text: "Folding the web into origami", emoji: "📄" },
  { text: "Teaching robots to screenshot", emoji: "🤖" },
  { text: "Bribing electrons to stay still for a portrait", emoji: "⚡" },
  { text: "Convincing HTML to behave for once", emoji: "🧘" },
  { text: "PDF-ifying at ludicrous speed", emoji: "🚀" },
  { text: "Making your content more portable", emoji: "💼" },
  { text: "Applying digital alchemy", emoji: "✨" },
  {
    text: "Telling CSS to sit in the corner and think about what it did",
    emoji: "🤔",
  },
];

const useQuirkyLoader = () => {
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setShowMessage(false);
      setTimeout(() => {
        setLoadingMsgIndex(
          (prevIndex) => (prevIndex + 1) % funnyLoadingMessages.length
        );
        setShowMessage(true);
      }, 300);
    }, 4000);

    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + 1;
        return newProgress > 100 ? 0 : newProgress;
      });
    }, 150);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const currentMessage = funnyLoadingMessages[loadingMsgIndex];

  return { currentMessage, showMessage, loadingProgress };
};

const QuirkyLoader = () => {
  const { loadingProgress } = useQuirkyLoader();

  return (
    <div className="w-full bg-secondary/30 h-2 rounded-full mb-3 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-200 ease-in-out"
        style={{ width: `${loadingProgress}%` }}
      ></div>
    </div>
  );
};

const ButtonContent = () => {
  const { currentMessage, showMessage } = useQuirkyLoader();

  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative flex items-center">
        <div className="absolute -left-7">
          <Loader2
            className={`h-5 w-5 animate-spin mr-2 text-background ${
              showMessage ? "opacity-100" : "opacity-50"
            }`}
          />
        </div>
        <div
          className={`flex items-center transition-opacity duration-300 ${
            showMessage ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="mr-2 text-xl">{currentMessage.emoji}</span>
          <span className="font-medium">{currentMessage.text}...</span>
        </div>
      </div>
    </div>
  );
};

QuirkyLoader.ButtonContent = ButtonContent;

export { QuirkyLoader };
