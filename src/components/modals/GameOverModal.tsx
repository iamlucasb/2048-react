import React, { useEffect } from 'react';
import Button from '../ui/Button';
import GradientBorder from '../ui/GradientBorder';
import Title from '../ui/Title';
import { addScore } from '../../firebase/scoreService';
import { useOverlay } from '../../context/OverlayProvider';

interface GameOverModalProps {
  score: number;
  username: string;
  onReturnToHome: () => void;
  onReplay: () => void;
}

/**
 * Composant modal pour afficher l'écran de fin de partie
 */
const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  username,
  onReturnToHome,
  onReplay,
}) => {
  const { closeOverlay } = useOverlay();

  useEffect(() => {
    const saveScore = async () => {
      if (score > 0 && username) {
        try {
          await addScore(username, score);
          console.log('Score sauvegardé avec succès');
        } catch (error) {
          console.error('Erreur lors de la sauvegarde du score:', error);
        }
      }
    };

    saveScore();
  }, [score, username]);

  const handleReplay = () => {
    onReplay();
  };

  const handleReturnToHome = () => {
    onReturnToHome();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative z-50 animate-pop">
        <GradientBorder>
          <div className="bg-gray-900 p-5 rounded-lg flex flex-col items-center shadow-xl">
            <Title
              text="Game Over"
              className="mb-2"
              as="h2"
            />
            <p className="text-white text-xl mb-4">
              Final score: <span className="font-bold">{score}</span>
            </p>
            <div className="flex space-x-4">
              <Button
                onClick={handleReplay}
                variant="primary">
                Replay
              </Button>
              <Button
                onClick={handleReturnToHome}
                variant="secondary">
                Return to home
              </Button>
            </div>
          </div>
        </GradientBorder>
      </div>
    </div>
  );
};

export default GameOverModal;
