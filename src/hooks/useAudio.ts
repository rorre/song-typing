import { useState, useEffect, useRef } from "react";
import { useInterval } from ".";

const nullAudio = new Audio();
export const useAudio = (url: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement>(nullAudio);
  const [playing, setPlaying] = useState(false);
  const listeners = useRef<(() => void)[]>([]);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
      audio.pause();
      audio.remove();
    };
  }, [audio]);

  useEffect(() => {
    setAudio(new Audio(url));
  }, [url]);

  function listenTimeUpdate(func: () => void) {
    audio.addEventListener("timeupdate", func);
    listeners.current.push(func);
  }

  useInterval(() => {
    listeners.current.forEach((listener) => listener());
  }, 10);

  return { audio, playing, toggle, listenTimeUpdate };
};
