export interface LyricData {
  startTime: number;
  endTime: number;
  lyric: string;
  ignore?: boolean;
}

export interface Metadata {
  artist: string;
  title: string;
  src: string;
  difficulty: number;
}

export interface Song extends Metadata {
  lyrics: LyricData[];
}
