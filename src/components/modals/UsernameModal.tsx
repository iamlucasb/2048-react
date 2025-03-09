import React, { useState } from 'react';
import Button from '../ui/Button';
import GradientBorder from '../ui/GradientBorder';
import { useOverlay } from '../../context/OverlayProvider';

interface UsernameModalProps {
  username: string;
  setUsername: (username: string) => void;
  onSubmit: () => void;
}

/**
 * Composant modal pour saisir le pseudo du joueur
 */
const UsernameModal: React.FC<UsernameModalProps> = ({
  username,
  setUsername,
  onSubmit,
}) => {
  const [error, setError] = useState('');
  const { closeOverlay } = useOverlay();

  const handleStartGame = () => {
    if (!username.trim()) {
      setError('Veuillez entrer un pseudo');
      return;
    }
    onSubmit();
    closeOverlay();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-md relative z-50">
        <h2 className="text-2xl font-bold text-white mb-4">
          Enter your username
        </h2>
        <GradientBorder
          onFocus={true}
          className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            placeholder="Votre pseudo"
            className="w-full p-3 bg-slate-700 text-white rounded-md focus:outline-none"
          />
        </GradientBorder>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={closeOverlay}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleStartGame}>
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UsernameModal;
