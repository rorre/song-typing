import { Route } from "@tanstack/react-router";
import { rootRoute } from "./root";
import GameScreen from "../components/GameScreen/GameScreen";
import { getAllSongs } from "../core/songs";
import { readTextFile } from "@tauri-apps/api/fs";
import { LyricData } from "../types";

export const playRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "play/$songId",
  loader: async ({ params: { songId } }) => {
    const songs = await getAllSongs();
    const song = songs[Number(songId)];
    const lyricsOriginal = (
      JSON.parse(await readTextFile(song.path + "/lyrics.json")) as unknown[]
    ).map((data) => LyricData.parse(data));
    const lyrics = lyricsOriginal.map((lyric) => ({
      ...lyric,
      lyric: lyric.lyric.toLowerCase(),
    }));

    // HACK: We cannot recalculate last line because after last line it will
    //       remove the gameplay component, so we hack it by adding an empty
    //       lyric line
    lyrics.push({
      startTime: lyrics[lyrics.length - 1].endTime,
      endTime: lyrics[lyrics.length - 1].endTime,
      lyric: "",
      ignore: true,
    });
    return {
      ...song,
      lyrics: lyrics,
    };
  },

  component: ({ useLoader }) => {
    const song = useLoader();

    return <GameScreen song={song} />;
  },
});
