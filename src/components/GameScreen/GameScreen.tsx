import React, { useCallback, useState } from "react";
import { GameContext, Performance } from "./GameContext";
import { LyricData, Song } from "../../types";
import { useAudio, useInterval } from "../../hooks";
import Playfield from "./Playfield";

const OFFSET = 200;

export default function GameScreen({ song }: { song: Song }) {
  const [score, setScore] = useState(0);
  const [currentLyricsRow, setLyricsRow] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [performance, setPerformance] = useState<Performance>({
    bestCombo: 0,
    combo: 0,
    cpm: 0,
    misses: 0,
  });
  const { audio, playing, toggle } = useAudio(song.src);
  const lyrics: LyricData[] = song.lyrics;

  useInterval(() => {
    setCurrentTime(audio.currentTime * 1000 + OFFSET);
    if (lyrics[currentLyricsRow].endTime < audio.currentTime * 1000 + OFFSET) {
      setLyricsRow(currentLyricsRow + 1);
    }
  }, 50);

  const incrementScore = useCallback((delta: number) => {
    setScore((curr) => curr + delta);
  }, []);

  const updatePerformance = useCallback(
    (newPerformance: Partial<Performance>) => {
      setPerformance((performance) => ({
        ...performance,
        ...newPerformance,
      }));
    },
    []
  );

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
        performance,
        updatePerformance,
      }}
    >
      <Playfield />
    </GameContext.Provider>
  );
}
