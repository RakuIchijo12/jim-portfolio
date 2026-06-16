"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";

const audioSource = "/A%20Sky%20Full%20of%20Stars%20(Instrumental).mp3";

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activationAttemptedRef = useRef(false);
  const volumeRef = useRef(72);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(true);
  const [volume, setVolume] = useState(72);

  useEffect(() => {
    volumeRef.current = volume;

    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  async function startAudio(markBlocked = true) {
    const audio = audioRef.current;

    if (!audio) {
      return false;
    }

    audio.volume = volumeRef.current / 100;

    try {
      await audio.play();
      setIsPlaying(true);
      setIsAutoplayBlocked(false);
      return true;
    } catch {
      setIsPlaying(false);

      if (markBlocked) {
        setIsAutoplayBlocked(true);
      }

      return false;
    }
  }

  function stopAudio() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    setIsPlaying(false);
    setIsAutoplayBlocked(false);
  }

  useEffect(() => {
    if (!isAutoplayBlocked || isPlaying || activationAttemptedRef.current) {
      return;
    }

    let isTrying = false;

    const handleFirstInteraction = (event: Event) => {
      if (isTrying) {
        return;
      }

      if (
        event.target instanceof Element &&
        event.target.closest(".audio-control")
      ) {
        return;
      }

      isTrying = true;
      activationAttemptedRef.current = true;
      void startAudio(false).then((started) => {
        isTrying = false;

        if (!started) {
          activationAttemptedRef.current = false;
          setIsAutoplayBlocked(true);
        }
      });
    };

    document.addEventListener("pointerdown", handleFirstInteraction, {
      capture: true,
    });
    document.addEventListener("keydown", handleFirstInteraction, {
      capture: true,
    });

    return () => {
      document.removeEventListener("pointerdown", handleFirstInteraction, {
        capture: true,
      });
      document.removeEventListener("keydown", handleFirstInteraction, {
        capture: true,
      });
    };
  }, [isAutoplayBlocked, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      audio?.pause();
    };
  }, []);

  async function toggleAudio() {
    if (isPlaying) {
      stopAudio();
      return;
    }

    await startAudio();
  }

  function handleVolumeChange(event: ChangeEvent<HTMLInputElement>) {
    const nextVolume = Number(event.currentTarget.value);
    setVolume(nextVolume);
  }

  return (
    <div className="audio-control flex items-center gap-1">
      <audio
        loop
        onPause={() => setIsPlaying(false)}
        onPlay={() => {
          setIsPlaying(true);
          setIsAutoplayBlocked(false);
        }}
        preload="metadata"
        ref={audioRef}
        src={audioSource}
      />
      <button
        aria-label={
          isPlaying
            ? "Stop Sky Full of Stars instrumental"
            : "Play Sky Full of Stars instrumental"
        }
        aria-pressed={isPlaying}
        className="quirk-icon-button audio-toggle grid h-11 w-11 place-items-center rounded-md border-2 border-transparent text-[#eaf6ff] transition hover:border-[#78e5ff]/70 hover:bg-[#48f5ff]/15 hover:text-white focus:outline-none focus:ring-4 focus:ring-[#48f5ff]/35 dark:text-zinc-50"
        data-autoplay-blocked={isAutoplayBlocked ? "true" : undefined}
        onClick={toggleAudio}
        title={
          isPlaying
            ? "Stop Sky Full of Stars instrumental"
            : "Play Sky Full of Stars instrumental"
        }
        type="button"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M4 9v6h4l5 4V5L8 9H4Z" />
          {isPlaying ? (
            <>
              <path d="M17 9.5a4 4 0 0 1 0 5" />
              <path d="M19.5 7a7.5 7.5 0 0 1 0 10" />
            </>
          ) : (
            <>
              <path d="m18 9 4 4" />
              <path d="m22 9-4 4" />
            </>
          )}
        </svg>
      </button>
      <input
        aria-label="Sky Full of Stars instrumental volume"
        aria-valuetext={`${volume}%`}
        className="audio-volume h-11 w-16 sm:w-20"
        max="100"
        min="0"
        onChange={handleVolumeChange}
        step="1"
        title={`Sky Full of Stars instrumental volume: ${volume}%`}
        type="range"
        value={volume}
      />
    </div>
  );
}
