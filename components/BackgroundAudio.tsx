"use client";

import { useEffect, useRef } from "react";

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = async () => {
      try {
        await audio.play();
      } catch {
        // Ignore autoplay blocks until the user interacts with the page.
      }
    };

    const unlockAudio = () => {
      if (audio.paused) {
        void tryPlay();
      }
    };

    const onVisibilityChange = () => {
      if (!document.hidden && audio.paused) {
        void tryPlay();
      }
    };

    void tryPlay();

    window.addEventListener("pointerdown", unlockAudio);
    window.addEventListener("keydown", unlockAudio);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      loop
      autoPlay
      preload="metadata"
      playsInline
      aria-hidden="true"
      className="hidden"
    >
      <source src="https://cdn.shurerdhara.com/bg-audio/bg-audio.mp3" type="audio/mpeg" />
    </audio>
  );
}