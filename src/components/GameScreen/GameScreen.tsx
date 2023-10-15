import { useCallback, useState } from "react";
import { GameContext, Performance } from "./GameContext";
import { Song } from "../../types";
import { useAudio, useInterval } from "../../hooks";
import Playfield from "./Playfield";
import Result from "./Result";
import { useAtom } from "jotai";
import { offsetAtom } from "../../core/settings";
import { convertSongsSrc } from "../../core/path";

export default function GameScreen({ song }: { song: Song }) {
  const [offset] = useAtom(offsetAtom);
  const [score, setScore] = useState(0);
  const [currentLyricsRow, setLyricsRow] = useState(0);
  const [performance, setPerformance] = useState<Performance>({
    bestCombo: 0,
    combo: 0,
    cpm: 0,
    misses: 0,
  });
  const { audio, playing, toggle, listenTimeUpdate } = useAudio(
    convertSongsSrc(song.path + "/" + song.src)
  );

  useInterval(
    () => {
      if (
        song.lyrics[currentLyricsRow].endTime + offset <
        audio.currentTime * 1000
      ) {
        setLyricsRow(currentLyricsRow + 1);
      }
    },
    currentLyricsRow == song.lyrics.length ? null : 50
  );

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
        isPlaying: playing,
        incrementScore,
        performance,
        updatePerformance,
        listenTimeUpdate,
      }}
    >
      {currentLyricsRow < song.lyrics.length ? <Playfield /> : <Result />}
    </GameContext.Provider>
  );
}
