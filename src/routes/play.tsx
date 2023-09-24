import { Route } from "@tanstack/react-router";
import { rootRoute } from "./root";
import GameContextProvider from "../components/GameScreen/GameContextProvider";
import Playfield from "../components/GameScreen/Playfield";
import { LAGTRAIN } from "../constants";

export const playRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "play",
  component: () => (
    <GameContextProvider song={LAGTRAIN}>
      <Playfield />
    </GameContextProvider>
  ),
});
