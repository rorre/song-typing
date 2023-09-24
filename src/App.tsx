import { RouterProvider, Router } from "@tanstack/react-router";
import { playRoute } from "./routes/play";
import { rootRoute } from "./routes/root";

const routeTree = rootRoute.addChildren([playRoute]);
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

export default App;
