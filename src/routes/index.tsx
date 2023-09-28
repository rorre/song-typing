import { Await, Route, defer } from "@tanstack/react-router";
import { rootRoute } from "./root";
import SelectScreen from "../components/SelectScreen/SelectScreen";
import { getAllSongs } from "../core/songs";
import { Suspense } from "react";

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  loader: () => {
    const songs = getAllSongs();
    return {
      songs: defer(songs),
    };
  },
  component: ({ useLoader }) => {
    const { songs } = useLoader();
    return (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        }
      >
        <Await promise={songs}>{(data) => <SelectScreen songs={data} />}</Await>
      </Suspense>
    );
  },
});
