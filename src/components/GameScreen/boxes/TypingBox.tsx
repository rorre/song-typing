import clsx from "clsx";
import React from "react";
import { useGameContext } from "../GameContext";

interface TypingBoxProps extends React.HTMLProps<HTMLDivElement> {
  progress: string;
}

const fontWidth = 14.425;
export default function TypingBox(props: TypingBoxProps) {
  const { className, progress, ...rest } = props;
  const {
    song: { lyrics },
    currentLyricsRow,
    currentTime,
  } = useGameContext();

  const currentLyric = lyrics[currentLyricsRow];
  const timeRange = currentLyric.endTime - currentLyric.startTime;
  const rowProgressPercent =
    ((currentTime - currentLyric.startTime) / timeRange) * 100;
  return (
    <div
      className={clsx(
        "border border-white p-4 w-full flex flex-col gap-2 overflow-hidden text-2xl font-roboto relative",
        className
      )}
      {...rest}
    >
      <progress
        className="progress"
        value={rowProgressPercent}
        max="100"
      ></progress>

      <pre className="text-gray-500 uppercase inline-block">
        {lyrics[currentLyricsRow + 1]?.lyric ?? ""}&nbsp;
      </pre>

      <div className="uppercase relative prose flex flex-row">
        {currentLyric.lyric.split("").map((char, idx) => (
          <pre
            key={"orig-" + idx}
            className={clsx(
              currentLyric.ignore
                ? "text-gray-500"
                : progress.length <= idx
                ? "text-white"
                : progress.charAt(idx).toLowerCase() == char.toLowerCase()
                ? "text-gray-500"
                : "text-red-500"
            )}
          >
            {char}
          </pre>
        ))}
        {progress
          .slice(currentLyric.lyric.length)
          .split("")
          .map((char, idx) => (
            <pre key={"excess-" + idx} className="text-red-500">
              {char}
            </pre>
          ))}
        <span
          className="border-l-2 border-l-grey border-opacity-75 h-[1.75rem] absolute animate-pulse transition-all top-1"
          style={{
            left: progress.length * fontWidth + "px",
          }}
        />
        &nbsp;
      </div>
    </div>
  );
}
