import { useState, useEffect, useCallback, useRef } from "react";

interface TypewriterTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

type Phase = "typing" | "pausing" | "deleting" | "waiting";

export default function TypewriterText({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  className,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentWord = words[wordIndex] ?? "";

  const tick = useCallback(() => {
    switch (phase) {
      case "typing": {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setPhase("pausing");
        }
        break;
      }
      case "pausing": {
        setPhase("deleting");
        break;
      }
      case "deleting": {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setPhase("waiting");
        }
        break;
      }
      case "waiting": {
        setWordIndex((prev) => (prev + 1) % words.length);
        setPhase("typing");
        break;
      }
    }
  }, [phase, displayText, currentWord, words.length]);

  useEffect(() => {
    let delay: number;
    switch (phase) {
      case "typing":
        delay = typingSpeed;
        break;
      case "pausing":
        delay = pauseDuration;
        break;
      case "deleting":
        delay = deletingSpeed;
        break;
      case "waiting":
        delay = 500;
        break;
    }

    timeoutRef.current = setTimeout(tick, delay);

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [tick, phase, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 49.9% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .blinking-cursor {
          animation: blink 0.7s infinite;
        }
      `}</style>
      <span className={className}>
        {displayText}
        <span className="blinking-cursor">|</span>
      </span>
    </>
  );
}
