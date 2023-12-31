import { z } from "zod";

export const LyricData = z.object({
  startTime: z.number(),
  endTime: z.number(),
  lyric: z.string(),
  ignore: z.boolean().optional(),
});
export type LyricData = z.infer<typeof LyricData>;

export const Metadata = z.object({
  artist: z.string(),
  title: z.string(),
  cover: z.string(),
  src: z.string(),
  difficulty: z.number(),
  path: z.string(),
  id: z.string(),
});
export type Metadata = z.infer<typeof Metadata>;

export const Song = Metadata.extend({
  lyrics: z.array(LyricData),
});
export type Song = z.infer<typeof Song>;

export const Score = z.object({
  id: z.string(),
  score: z.number(),
});
export type Score = z.infer<typeof Score>;
