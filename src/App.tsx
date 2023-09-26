import { RouterProvider, Router } from "@tanstack/react-router";
import { playRoute } from "./routes/play";
import { rootRoute } from "./routes/root";
import { indexRoute } from "./routes";
import { processSongsFolder } from "./core/songs";

const routeTree = rootRoute.addChildren([playRoute, indexRoute]);
const router = new Router({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

async function a() {
  console.log(await processSongsFolder());
}
a();
export default App;
