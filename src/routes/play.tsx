import { Route } from "@tanstack/react-router";
import { rootRoute } from "./root";
import GameScreen from "../components/GameScreen/GameScreen";
import { processSongsFolder } from "../core/songs";
import { readTextFile } from "@tauri-apps/api/fs";
import { LyricData } from "../types";

export const playRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "play/$songId",
  loader: async ({ params: { songId } }) => {
    const songs = await processSongsFolder();
    const song = songs[Number(songId)];
    const lyrics = (
      JSON.parse(await readTextFile(song.path + "/lyrics.json")) as unknown[]
    ).map((data) => LyricData.parse(data));
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
