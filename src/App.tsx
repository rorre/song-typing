import GameContextProvider from "./components/GameContextProvider";
import Playfield from "./components/Playfield";
import { CONFLICT, LAGTRAIN } from "./constants";

function App() {
  return (
    <main>
      <GameContextProvider song={LAGTRAIN}>
        <Playfield />
      </GameContextProvider>
    </main>
  );
}

export default App;
