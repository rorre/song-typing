import { Route } from "@tanstack/react-router";
import { rootRoute } from "./root";
import GameScreen from "../components/GameScreen/GameScreen";
import { fakedb } from "../constants";

export const playRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "play/$songId",
  loader: async ({ params: { songId } }) => {
    return fakedb[Number(songId)];
  },

  component: ({ useLoader }) => {
    const song = useLoader();

    return <GameScreen song={song} />;
  },
});
