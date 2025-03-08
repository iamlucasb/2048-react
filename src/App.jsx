import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import Score from './components/Score';
import useGameLogic from './hooks/useGameLogic';
import clsx from 'clsx';

function App() {
  const { gameBoard, score, handleMove, isGameOver } = useGameLogic();

  return (
    <>
      {/* Overlay qui recouvre toute l'application quand le jeu est terminé */}
      <div
        className={clsx(
          'fixed inset-0 bg-black z-40 transition-opacity duration-500',
          {
            'opacity-0 invisible': !isGameOver,
            'opacity-60': isGameOver,
          }
        )}
      />

      <div className="flex flex-col h-screen items-center justify-center bg-slate-700 relative">
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
            <GameOver
              isGameOver={isGameOver}
              score={score}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
