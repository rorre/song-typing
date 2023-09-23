import React, { useState } from "react";
import { GameContext } from "./GameContext";
import { LyricData, Song } from "../types";
import { useAudio, useInterval } from "../hooks";

const OFFSET = 200;

export default function GameContextProvider({
  song,
  children,
}: {
  song: Song;
  children: React.ReactNode;
}) {
  const [score, setScore] = useState(0);
  const [currentLyricsRow, setLyricsRow] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const { audio, playing, toggle } = useAudio(song.src);
  const lyrics: LyricData[] = song.lyrics;

  useInterval(() => {
    setCurrentTime(audio.currentTime * 1000 + OFFSET);
    if (lyrics[currentLyricsRow].endTime < audio.currentTime * 1000 + OFFSET) {
      setLyricsRow(currentLyricsRow + 1);
    }
  }, 50);

  function incrementScore(delta: number) {
    setScore((curr) => curr + delta);
  }

  return (
    <GameContext.Provider
      value={{
        audio,
        song,
        currentLyricsRow,
        score,
        togglePlaying: toggle,
        currentTime,
        isPlaying: playing,
        incrementScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
