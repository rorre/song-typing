export interface LyricData {
  startTime: number;
  endTime: number;
  lyric: string;
  ignore?: boolean;
}

export interface Song {
  song: string;
  lyrics: LyricData[];
  src: string;
}
