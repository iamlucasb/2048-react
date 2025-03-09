import React, { useState } from 'react';
import SocialLinks from './socials/SocialLinks';
import SocialLink from './socials/SocialLink';
import { FaGithub, FaSquareXTwitter, FaRocket } from 'react-icons/fa6';
import Title from './ui/Title';
import Button from './ui/Button';
import { useOverlay } from '../context/OverlayProvider';
import UsernameModal from './modals/UsernameModal';
import ModalPortal from './modals/ModalPortal';

interface WelcomeScreenProps {
  onStartGame: (username: string) => void;
}

/**
 * Écran d'accueil du jeu 2048
 */
const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame }) => {
  const [username, setUsername] = useState('');
  const { openOverlay } = useOverlay();

  const handlePlayClick = () => {
    openOverlay();
  };

  const handleStartGame = () => {
    onStartGame(username);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xs p-6 bg-gray-800 rounded-2xl shadow-2xl">
      <Title
        className="mb-6"
        text="2048"
      />

      {/* Bouton Jouer */}
      <Button
        variant="primary"
        onClick={handlePlayClick}
        className="font-bold py-3 px-8 text-xl mb-8 shadow-md">
        Jouer
      </Button>

      {/* Réseaux sociaux */}
      <SocialLinks>
        <SocialLink href="https://github.com/iamlucasb">
          <FaGithub size={27} />
        </SocialLink>
        <SocialLink href="https://x.com/LucBoss_">
          <FaSquareXTwitter size={27} />
        </SocialLink>
        <SocialLink href="https://lucasbossard.dev">
          <FaRocket size={27} />
        </SocialLink>
      </SocialLinks>

      {/* Modal pour entrer le pseudo */}
      <ModalPortal>
        <UsernameModal 
          username={username}
          setUsername={setUsername}
          onSubmit={handleStartGame}
        />
      </ModalPortal>
    </div>
  );
};

export default WelcomeScreen;
