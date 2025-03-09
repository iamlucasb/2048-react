import React, { ReactNode } from 'react';
import { useOverlay } from '../../context/OverlayProvider';

interface ModalPortalProps {
  children: ReactNode;
  /**
   * Condition supplémentaire pour afficher le contenu
   * Si non fourni, seul isOpen de l'overlay sera utilisé
   */
  condition?: boolean;
}

/**
 * Composant qui affiche son contenu uniquement lorsque l'overlay est ouvert
 * et que la condition supplémentaire est remplie (si fournie)
 */
const ModalPortal: React.FC<ModalPortalProps> = ({ children, condition }) => {
  const { isOpen } = useOverlay();

  if (!isOpen || (condition !== undefined && !condition)) return null;

  return <>{children}</>;
};

export default ModalPortal;
