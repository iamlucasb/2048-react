import { useEffect, useState } from 'react';
import GameBoard from './components/GameBoard';
import Score from './components/Score';
import WelcomeScreen from './components/WelcomeScreen';
import useGameLogic from './hooks/useGameLogic';
import Title from './components/ui/Title';
import { useOverlay } from './context/OverlayProvider';
import GameOverModal from './components/modals/GameOverModal';
import ModalPortal from './components/modals/ModalPortal';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [username, setUsername] = useState('');
  const { gameBoard, score, handleMove, isGameOver, resetGame } =
    useGameLogic();

  const handleStartGame = (playerName) => {
    setUsername(playerName);
    setGameStarted(true);
  };

  const { openOverlay, closeOverlay } = useOverlay();

  const handleReturnToHome = () => {
    setGameStarted(false);
    resetGame();
    closeOverlay();
  };

  const handleReplay = () => {
    resetGame();
    closeOverlay();
  };

  useEffect(() => {
    if (isGameOver) {
      openOverlay();
    }
  }, [isGameOver, openOverlay]);

  return (
    <div className="grid grid-cols-1 grid-rows-1">
      <div className="col-start-1 row-start-1 flex flex-col h-screen items-center justify-center relative">
        {!gameStarted ? (
          <WelcomeScreen onStartGame={handleStartGame} />
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center gap-2">
                <Title
                  text="2048"
                  className="w-full text-center bg-gray-800 rounded-lg h-full flex items-center justify-center"
                />
                <Score score={score} />
              </div>
              {/* Zone de jeux */}
              <GameBoard
                gameBoard={gameBoard}
                handleMove={handleMove}
              />
            </div>
          </>
        )}
      </div>
      
      {/* Game Over Modal */}
      <ModalPortal condition={isGameOver}>
        <GameOverModal
          score={score}
          username={username}
          onReturnToHome={handleReturnToHome}
          onReplay={handleReplay}
        />
      </ModalPortal>
    </div>
  );
}

export default App;
