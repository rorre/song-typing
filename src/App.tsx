import GameContextProvider from "./components/GameScreen/GameContextProvider";
import Playfield from "./components/GameScreen/Playfield";
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
