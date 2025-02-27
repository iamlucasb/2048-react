import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import Score from './components/Score';
import useGameLogic from './hooks/useGameLogic';

function App() {
  const { gameBoard, score, handleMove, isGameOver } = useGameLogic();

  return (
    <>
      <div className="flex flex-col h-screen items-center justify-center bg-slate-700">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white w-full text-center">
              2048
            </h1>
            <Score score={score} />
          </div>
          {/* Zone de jeux */}
          <div className="grid grid-cols-1 grid-rows-1">
            <GameBoard
              gameBoard={gameBoard}
              handleMove={handleMove}
            />
            <GameOver isGameOver={isGameOver} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
