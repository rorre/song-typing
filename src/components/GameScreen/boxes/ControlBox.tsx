import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useGameContext } from "../GameContext";
import { volumeAtom } from "../../../core/settings";
import { useAtom } from "jotai";

export default function ControlBox(props: React.HTMLProps<HTMLDivElement>) {
  const { className, ...rest } = props;
  const [volume, setVolume] = useAtom(volumeAtom);
  const { audio, isPlaying, togglePlaying } = useGameContext();

  useEffect(() => {
    audio.volume = volume / 100;
  }, [audio, volume]);

  return (
    <div
      className={clsx("flex flex-col w-full justify-between gap-4", className)}
      {...rest}
    >
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
        <Link to="/" className="flex-1">
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
  );
}
