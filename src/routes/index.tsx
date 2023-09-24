import { Route } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { fakedb } from "../constants";
import SelectScreen from "../components/SelectScreen/SelectScreen";

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <SelectScreen songs={fakedb} />,
});
