import { Route } from "@tanstack/react-router";
import { rootRoute } from "./root";
import GameContextProvider from "../components/GameScreen/GameContextProvider";
import Playfield from "../components/GameScreen/Playfield";
import { fakedb } from "../constants";

export const playRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "play/$songId",
  loader: async ({ params: { songId } }) => {
    return fakedb[Number(songId)];
  },

  component: ({ useLoader }) => {
    const song = useLoader();

    return (
      <GameContextProvider song={song}>
        <Playfield />
      </GameContextProvider>
    );
  },
});
