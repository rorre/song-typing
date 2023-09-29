import { Route } from "@tanstack/react-router";
import { rootRoute } from "./root";
import GameScreen from "../components/GameScreen/GameScreen";
import { getSong } from "../core/songs";

export const playRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "play/$songId",
  loader: async ({ params: { songId } }) => {
    return await getSong(songId);
  },

  component: ({ useLoader }) => {
    const song = useLoader();

    return <GameScreen song={song} />;
  },
});
