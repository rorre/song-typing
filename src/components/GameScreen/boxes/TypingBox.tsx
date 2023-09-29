import clsx from "clsx";
import React from "react";
import { useGameContext } from "../GameContext";
import AudioRelativeProgress from "../AudioRelativeProgress";
import { FONT_WIDTH } from "../../../constants";

interface TypingBoxProps extends React.HTMLProps<HTMLDivElement> {
  progress: string;
}

export default function TypingBox(props: TypingBoxProps) {
  const { className, progress, ...rest } = props;
  const {
    song: { lyrics },
    currentLyricsRow,
  } = useGameContext();

  const currentLyric = lyrics[currentLyricsRow];
  return (
    <div
      className={clsx(
        "border border-white p-4 w-full flex flex-col gap-2 overflow-hidden text-2xl relative",
        className
      )}
      {...rest}
    >
      <AudioRelativeProgress
        baseTime={currentLyric.startTime}
        finalTime={currentLyric.endTime}
      />

      <pre className="text-gray-500 uppercase inline-block font-roboto">
        {lyrics[currentLyricsRow + 1]?.lyric ?? ""}&nbsp;
      </pre>

      <div className="uppercase relative prose flex flex-row">
        {currentLyric.lyric.split("").map((char, idx) => (
          <pre
            key={"orig-" + idx}
            className={clsx(
              "font-roboto",
              currentLyric.ignore
                ? "text-gray-500"
                : progress.length <= idx
                ? "text-white"
                : progress.charAt(idx).toLowerCase() == char.toLowerCase()
                ? "text-gray-500"
                : char != " "
                ? "text-red-500"
                : "bg-red-500"
            )}
          >
            {char}
          </pre>
        ))}
        {/* Cursor */}
        <span
          className="border-l-2 border-l-grey border-opacity-75 h-[1.75rem] absolute animate-pulse transition-all top-1"
          style={{
            left: progress.length * FONT_WIDTH + "px",
          }}
        />
        &nbsp;
      </div>
    </div>
  );
}
