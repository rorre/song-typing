import { useEffect, useMemo, useState } from "react";
import { useGameContext } from "./GameContext";
import { useEventListener, useOnDepsChange } from "../hooks";
import clsx from "clsx";
import { calculateScore } from "../utils";

const fontWidth = 13.2;
export default function Playfield() {
  const {
    song: { song, lyrics },
    score,
    currentLyricsRow,
    togglePlaying,
    currentTime,
    incrementScore,
    isPlaying,
  } = useGameContext();
  const [progress, setProgress] = useState("");
  const [finishTime, setFinishTime] = useState(0);

  const currentLyric = lyrics[currentLyricsRow];
  useEventListener("keydown", (e) => {
    let key = e.key;
    if (!key.match(/^[0-9a-z]+$/) && key != "Backspace") return;

    e.preventDefault();
    if (!e.isTrusted) return;
    if (currentLyric.ignore) return;

    if (key == "Backspace") {
      if (progress.charAt(progress.length - 1) == " ") {
        return setProgress((progress) =>
          progress.slice(0, progress.length - 2)
        );
      } else {
        return setProgress((progress) =>
          progress.slice(0, progress.length - 1)
        );
      }
    }

    if (key.length > 1) return;
    if (currentLyric.lyric.charAt(progress.length + 1) == " ") {
      key = key + " ";
    }
    setProgress((current) => current + key.toLowerCase());
  });

  useOnDepsChange(() => {
    const prevLyric = lyrics[currentLyricsRow - 1];
    if (!isPlaying || prevLyric.ignore) return;

    const rowScore = calculateScore(
      prevLyric.lyric,
      progress,
      (finishTime > 0 ? finishTime : prevLyric.endTime) - prevLyric.endTime,
      prevLyric.endTime - prevLyric.startTime
    );
    incrementScore(rowScore);
    setProgress("");
  }, [currentLyricsRow]);

  useEffect(() => {
    currentLyric.lyric
      .split("")
      .map(
        (char, idx) => progress.charAt(idx).toLowerCase() == char.toLowerCase()
      )
      .every((x) => x == true) && setFinishTime(currentTime);
  }, [progress, currentLyric, currentTime]);

  const timeRange = useMemo(
    () => currentLyric.endTime - currentLyric.startTime,
    [currentLyric]
  );

  const progressPercent =
    ((currentTime - currentLyric.startTime) / timeRange) * 100;
  return (
    <div className="container max-w-4xl mx-auto flex flex-col items-center justify-center h-screen select-none gap-2">
      <div className="flex flex-row justify-between w-full">
        <strong>{song}</strong>
        <strong>{score}</strong>
      </div>

      <div className="border border-white p-4 w-full flex flex-col gap-2 overflow-hidden text-2xl font-mono relative">
        <progress
          className="progress"
          value={progressPercent}
          max="100"
        ></progress>

        <p className="text-gray-500 uppercase">
          {lyrics[currentLyricsRow + 1]?.lyric ?? ""}
        </p>

        <p className="uppercase relative">
          {currentLyric.lyric.split("").map((char, idx) => (
            <span
              className={clsx(
                progress.length <= idx
                  ? "text-white"
                  : progress.charAt(idx).toLowerCase() == char.toLowerCase()
                  ? "text-gray-500"
                  : "text-red-500"
              )}
            >
              {char}
            </span>
          ))}
          {progress
            .slice(currentLyric.lyric.length)
            .split("")
            .map((char) => (
              <span className="text-red-500">{char}</span>
            ))}

          <div
            className="border-l-2 border-l-grey border-opacity-75 h-[1.75rem] absolute animate-pulse transition-all top-1"
            style={{
              left: progress.length * fontWidth + "px",
            }}
          />
        </p>
      </div>

      <div>
        <button className="btn btn-primary" onClick={() => togglePlaying()}>
          Start
        </button>
      </div>
    </div>
  );
}
