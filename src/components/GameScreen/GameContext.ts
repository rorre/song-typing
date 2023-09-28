import { createContext, useContext } from "react";
import { Song } from "../../types";

export interface Performance {
  bestCombo: number;
  combo: number;
  misses: number;
  cpm: number;
}

export interface GameData {
  audio: HTMLAudioElement;
  song: Song;
  score: number;
  currentLyricsRow: number;
  isPlaying: boolean;
  togglePlaying: () => void;
  incrementScore: (delta: number) => void;
  performance: {
    bestCombo: number;
    combo: number;
    misses: number;
    cpm: number;
  };
  updatePerformance: (performance: Partial<Performance>) => void;
  listenTimeUpdate: (func: () => void) => void;
}

export const GameContext = createContext<GameData>({
  audio: null as unknown as HTMLAudioElement,
  song: {
    id: "",
    artist: "",
    title: "",
    lyrics: [],
    src: "",
    difficulty: 0,
    path: "",
    cover: "",
  },
  score: 0,
  currentLyricsRow: 0,
  isPlaying: false,
  togglePlaying: () => null,
  incrementScore: () => null,
  performance: {
    bestCombo: 0,
    combo: 0,
    misses: 0,
    cpm: 0,
  },
  updatePerformance: () => null,
  listenTimeUpdate: () => null,
});

export const useGameContext = () => useContext(GameContext);
