import { useEffect, useState } from "react";

interface CountdownProps {
  seconds: number;
  onComplete?: () => void;
}

export function Countdown({ seconds, onComplete }: CountdownProps) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    const deadline = Date.now() + seconds * 1000;

    const update = () => {
      const next = Math.max(Math.ceil((deadline - Date.now()) / 1000), 0);

      setRemaining(next);

      if (next === 0) {
        onComplete?.();
        return;
      }

      const delay = (deadline - Date.now()) % 1000 || 1000;

      timer = window.setTimeout(update, delay);
    };

    let timer = window.setTimeout(update, 0);

    return () => window.clearTimeout(timer);
  }, [seconds, onComplete]);

  return <span>{remaining}</span>;
}
