import { useEffect, useState } from "react";
import { useGameContext } from "./GameContext";
import { useEventListener, useOnDepsChange } from "../../hooks";
import clsx from "clsx";
import { calculateScore } from "../../utils";
import { Link } from "@tanstack/react-router";

const fontWidth = 13.2;
export default function Playfield() {
  const {
    audio,
    song: { song, lyrics },
    score,
    currentLyricsRow,
    togglePlaying,
    currentTime,
    incrementScore,
    isPlaying,
    performance,
    updatePerformance,
  } = useGameContext();
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState("");
  const [finishTime, setFinishTime] = useState(0);

  const currentLyric = lyrics[currentLyricsRow];
  useEventListener("keydown", (e) => {
    let key = e.key;
    if (!key.match(/^[0-9a-z]+$/) && key != "Backspace") return;

    e.preventDefault();
    if (!e.isTrusted) return;
    if (currentLyric.ignore || !isPlaying) return;

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

    if (currentLyric.lyric.charAt(progress.length) == key.charAt(0)) {
      updatePerformance({
        combo: performance.combo + 1,
      });
    } else {
      const bestCombo =
        performance.bestCombo > performance.combo
          ? performance.bestCombo
          : performance.combo;
      updatePerformance({
        misses: performance.misses + 1,
        bestCombo,
        combo: 0,
      });
    }
    setProgress((current) => current + key.toLowerCase());
  });

  useOnDepsChange(() => {
    const prevLyric = lyrics[currentLyricsRow - 1];
    if (!isPlaying || prevLyric.ignore) return;

    const prevTimeRange = prevLyric.endTime - prevLyric.startTime;
    const rowScore = calculateScore(
      prevLyric.lyric,
      progress,
      (finishTime > 0 ? finishTime : prevLyric.endTime) - prevLyric.endTime,
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

    console.log(writtenChars);
    updatePerformance({
      cpm: Math.round((writtenChars / prevTimeRange) * 1000 * 60),
    });
  }, [currentLyricsRow]);

  useEffect(() => {
    currentLyric.lyric
      .split("")
      .map(
        (char, idx) => progress.charAt(idx).toLowerCase() == char.toLowerCase()
      )
      .every((x) => x == true) && setFinishTime(currentTime);
  }, [progress, currentLyric, currentTime]);

  useEffect(() => {
    audio.volume = volume / 100;
  }, [audio, volume]);

  const songProgress = (currentTime / (audio.duration * 1000)) * 100;

  const timeRange = currentLyric.endTime - currentLyric.startTime;
  const rowProgressPercent =
    ((currentTime - currentLyric.startTime) / timeRange) * 100;
  return (
    <div className="container max-w-4xl mx-auto flex flex-col items-center justify-center h-screen select-none gap-2">
      <strong className="self-start">{song}</strong>
      <div className="flex flex-row justify-between w-full">
        <strong>
          {currentLyricsRow + 1}/{lyrics.length}
        </strong>
        <strong>{score}</strong>
      </div>

      <progress className="progress" value={songProgress} max="100"></progress>

      <div className="border border-white p-4 w-full flex flex-col gap-2 overflow-hidden text-2xl font-mono relative">
        <progress
          className="progress"
          value={rowProgressPercent}
          max="100"
        ></progress>

        <p className="text-gray-500 uppercase">
          {lyrics[currentLyricsRow + 1]?.lyric ?? ""}
        </p>

        <p className="uppercase relative">
          {currentLyric.lyric.split("").map((char, idx) => (
            <span
              key={"orig-" + idx}
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
            .map((char, idx) => (
              <span key={"excess-" + idx} className="text-red-500">
                {char}
              </span>
            ))}

          <span
            className="border-l-2 border-l-grey border-opacity-75 h-[1.75rem] absolute animate-pulse transition-all top-1"
            style={{
              left: progress.length * fontWidth + "px",
            }}
          />
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full">
        <div className="flex flex-col">
          <strong className="text-xl">{performance.combo}</strong>
          <div className="divider m-0"></div>
          <span className="text-sm">Combo</span>
        </div>

        <div className="flex flex-col">
          <strong className="text-xl">{performance.bestCombo}</strong>
          <div className="divider m-0"></div>
          <span className="text-sm">Best Combo</span>
        </div>

        <div className="flex flex-col">
          <strong className="text-xl">{performance.misses}</strong>
          <div className="divider m-0"></div>
          <span className="text-sm">Misses</span>
        </div>

        <div className="flex flex-col">
          <strong className="text-xl">{performance.cpm}</strong>
          <div className="divider m-0"></div>
          <span className="text-sm">CPM</span>
        </div>
      </div>

      <div className="flex flex-col w-full justify-between gap-4 pt-4">
        <div className="flex flex-row gap-4">
          <p>Volume</p>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            className="range"
            onChange={(e) => setVolume(e.target.valueAsNumber)}
          />
          <span>{volume}%</span>
        </div>

        <div className="flex flex-row gap-4 items-stretch w-full">
          <Link href="/" className="flex-1">
            <button className="btn btn-error w-full">Exit</button>
          </Link>
          <button
            className={clsx(
              "btn flex-1",
              isPlaying ? "btn-secondary" : "btn-primary"
            )}
            onClick={() => togglePlaying()}
          >
            {isPlaying ? "Pause" : "Start"}
          </button>
        </div>
      </div>
    </div>
  );
}
