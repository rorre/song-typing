export interface LyricData {
  startTime: number;
  endTime: number;
  lyric: string;
  ignore?: boolean;
}

export interface Metadata {
  song: string;
  src: string;
  difficulty: number;
}

export interface Song extends Metadata {
  lyrics: LyricData[];
}
