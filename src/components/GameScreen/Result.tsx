import { Link } from "@tanstack/react-router";
import { useGameContext } from "./GameContext";
import { useMemo } from "react";

const GRADES: [number, string][] = [
  [130, "SS+"],
  [120, "SS"],
  [110, "S"],
  [100, "A"],
  [90, "A-"],
  [80, "A"],
  [70, "B"],
  [60, "C"],
  [50, "D"],
];
export default function Result() {
  const {
    performance,
    score,
    song: { lyrics },
  } = useGameContext();

  const maximumScore = useMemo(
    () =>
      lyrics
        .map((lyric) => lyric.lyric.replace(/ /g, "").length * 10)
        .reduce((prev, curr) => prev + curr, 0),
    [lyrics]
  );

  const grade = GRADES.find((grade) => (score / maximumScore) * 100 > grade[0]);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="px-8 py-8 rounded-xl bg-base-200 flex flex-col gap-4">
        <h1 className="text-xl font-bold text-center">Result</h1>

        <strong className="text-center text-8xl">{grade?.[1] ?? "F"}</strong>
        <strong className="text-center text-4xl">{score}</strong>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Best Combo</div>
            <div className="stat-value">{performance.bestCombo}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Misses</div>
            <div className="stat-value">{performance.misses}</div>
          </div>
        </div>

        <div className="flex flex-row gap-4 items-stretch w-full">
          <Link href="/" className="flex-1">
            <button className="btn btn-error w-full">Back</button>
          </Link>
          <button
            className="btn-primary btn flex-1"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
