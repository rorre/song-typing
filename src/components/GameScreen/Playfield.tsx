import { useCallback, useEffect, useMemo, useState } from "react";
import { useGameContext } from "./GameContext";
import { useEventListener, useOnDepsChange } from "../../hooks";
import { calculateScore } from "../../utils";
import PerformanceBox from "./boxes/PerformanceBox";
import ControlBox from "./boxes/ControlBox";
import TypingBox from "./boxes/TypingBox";
import AudioRelativeProgress from "./AudioRelativeProgress";
import { enforceSpaceAtom } from "../../core/settings";
import { useAtom } from "jotai";
export default function Playfield() {
  const {
    audio,
    song: { artist, title, lyrics },
    score,
    currentLyricsRow,
    incrementScore,
    isPlaying,
    performance,
    updatePerformance,
  } = useGameContext();

  const [enforceSpace] = useAtom(enforceSpaceAtom);
  const [progress, setProgress] = useState("");
  const [finishTime, setFinishTime] = useState(0);
  const currentLyric = useMemo(
    () => lyrics[currentLyricsRow],
    [currentLyricsRow, lyrics]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      let key = e.key;
      // eslint-disable-next-line no-useless-escape
      if (key.length > 1 && key != "Backspace" && key != "Space") return;

      e.preventDefault();
      if (!e.isTrusted) return;
      if (currentLyric.ignore || !isPlaying) return;

      if (key == "Backspace") {
        if (progress.charAt(progress.length - 1) == " " && !enforceSpace) {
          return setProgress((progress) =>
            progress.slice(0, progress.length - 2)
          );
        } else {
          return setProgress((progress) =>
            progress.slice(0, progress.length - 1)
          );
        }
      }

      if (key == "Space") {
        key = " ";
      }

      if (progress.length >= currentLyric.lyric.length) return;
      if (
        currentLyric.lyric.charAt(progress.length + 1) == " " &&
        !enforceSpace
      ) {
        key = key + " ";
      }

      const newCombo =
        currentLyric.lyric.charAt(progress.length) == key.charAt(0)
          ? performance.combo + 1
          : 0;

      const bestCombo =
        performance.bestCombo > newCombo ? performance.bestCombo : newCombo;

      if (currentLyric.lyric.charAt(progress.length) == key.charAt(0)) {
        updatePerformance({
          combo: newCombo,
          bestCombo,
        });
      } else {
        updatePerformance({
          misses: performance.misses + 1,
          bestCombo,
          combo: newCombo,
        });
      }
      setProgress((current) => current + key.toLowerCase());
    },
    [
      currentLyric,
      isPlaying,
      performance.bestCombo,
      performance.combo,
      performance.misses,
      progress,
      updatePerformance,
      enforceSpace,
    ]
  );

  const onRowChange = useCallback(() => {
    const prevLyric = lyrics[currentLyricsRow - 1];
    if (!isPlaying || prevLyric.ignore) return;

    const prevTimeRange = prevLyric.endTime - prevLyric.startTime;
    const timeFinish = finishTime > 0 ? finishTime : prevLyric.endTime;
    const rowScore = calculateScore(
      prevLyric.lyric,
      progress,
      prevLyric.endTime - timeFinish,
      prevTimeRange
    );
    incrementScore(rowScore);
    setProgress("");
    setFinishTime(0);

    const writtenChars = prevLyric.lyric
      .split("")
      .map((char, idx) =>
        idx >= progress.length
          ? 0
          : progress.charAt(idx).toLowerCase() == char.toLowerCase()
          ? 1
          : 0.5
      )
      .reduce((p, c) => p + c, 0 as number);

    updatePerformance({
      cpm: Math.round(
        (writtenChars / (timeFinish - prevLyric.startTime)) * 1000 * 60
      ),
    });
  }, [
    currentLyricsRow,
    finishTime,
    incrementScore,
    isPlaying,
    lyrics,
    progress,
    updatePerformance,
  ]);

  useEventListener("keydown", onKeyDown);
  useOnDepsChange(onRowChange, [currentLyricsRow]);

  useEffect(() => {
    if (currentLyric.ignore) return;

    currentLyric.lyric
      .split("")
      .map(
        (char, idx) => progress.charAt(idx).toLowerCase() == char.toLowerCase()
      )
      .every((x) => x == true) && setFinishTime(audio.currentTime * 1000);
  }, [progress, currentLyric, audio.currentTime]);

  return (
    <div className="container max-w-4xl mx-auto flex flex-col items-center justify-center h-screen select-none gap-2 px-4">
      <strong className="self-start">
        {artist} - {title}
      </strong>
      <div className="flex flex-row justify-between w-full">
        <strong>
          {currentLyricsRow + 1}/{lyrics.length}
        </strong>
        <strong>{score}</strong>
      </div>

      <AudioRelativeProgress baseTime={0} finalTime={audio.duration * 1000} />

      <TypingBox progress={progress} />
      <PerformanceBox />
      <ControlBox />
    </div>
  );
}
