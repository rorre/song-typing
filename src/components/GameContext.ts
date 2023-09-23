import { createContext, useContext } from "react";
import { Song } from "../types";

export interface GameData {
  audio: HTMLAudioElement;
  song: Song;
  score: number;
  currentLyricsRow: number;
  currentTime: number;
  isPlaying: boolean;
  togglePlaying: () => void;
  incrementScore: (delta: number) => void;
}

export const GameContext = createContext<GameData>({
  audio: null as unknown as HTMLAudioElement,
  song: {
    song: "None",
    lyrics: [],
    src: "",
  },
  score: 0,
  currentLyricsRow: 0,
  currentTime: 0,
  isPlaying: false,
  togglePlaying: () => null,
  incrementScore: () => null,
});

export const useGameContext = () => useContext(GameContext);
