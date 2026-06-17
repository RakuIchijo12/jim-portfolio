"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";

const audioSource =
  "/Interstellar%20Official%20Soundtrack%20%20Cornfield%20Chase%20%20Hans%20Zimmer%20%20WaterTower.mp3";
const audioLabel = "Interstellar official soundtrack";

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeRef = useRef(72);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(72);

  useEffect(() => {
    volumeRef.current = volume;

    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  async function startAudio() {
    const audio = audioRef.current;

    if (!audio) {
      return false;
    }

    audio.volume = volumeRef.current / 100;

    try {
      await audio.play();
      setIsPlaying(true);
      return true;
    } catch {
      setIsPlaying(false);
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
  }

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
        }}
        preload="none"
        ref={audioRef}
        src={audioSource}
      />
      <button
        aria-label={
          isPlaying
            ? `Stop ${audioLabel}`
            : `Play ${audioLabel}`
        }
        aria-pressed={isPlaying}
        className="quirk-icon-button audio-toggle grid h-11 w-11 place-items-center rounded-md border-2 border-transparent text-[#eaf6ff] transition hover:border-[#78e5ff]/70 hover:bg-[#48f5ff]/15 hover:text-white focus:outline-none focus:ring-4 focus:ring-[#48f5ff]/35 dark:text-zinc-50"
        onClick={toggleAudio}
        title={
          isPlaying
            ? `Stop ${audioLabel}`
            : `Play ${audioLabel}`
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
        aria-label="Volume"
        aria-valuetext={`${volume}%`}
        className="audio-volume h-11 w-16 sm:w-20"
        max="100"
        min="0"
        onChange={handleVolumeChange}
        step="1"
        title={`Volume: ${volume}%`}
        type="range"
        value={volume}
      />
    </div>
  );
}
