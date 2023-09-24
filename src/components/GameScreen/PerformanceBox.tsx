import React from "react";
import { useGameContext } from "./GameContext";
import clsx from "clsx";

export default function PerformanceBox(props: React.HTMLProps<HTMLDivElement>) {
  const { className, ...rest } = props;
  const { performance } = useGameContext();

  return (
    <div className={clsx("grid grid-cols-4 gap-4 w-full", className)} {...rest}>
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
  );
}
