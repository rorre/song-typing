import { useEffect, useState } from "react";
import { useGameContext } from "./GameContext";

interface AudioRelativeProgressProps {
  finalTime: number;
  baseTime: number;
}

export default function AudioRelativeProgress({
  finalTime,
  baseTime,
}: AudioRelativeProgressProps) {
  const { listenTimeUpdate, audio } = useGameContext();
  const [currentTime, setCurrentTime] = useState(audio.currentTime);

  useEffect(() => {
    listenTimeUpdate(() => {
      setCurrentTime(audio.currentTime * 1000);
    });
  }, [listenTimeUpdate, audio]);

  const percent = ((currentTime - baseTime) / (finalTime - baseTime)) * 100;
  return <progress className="progress" value={percent} max="100"></progress>;
}
