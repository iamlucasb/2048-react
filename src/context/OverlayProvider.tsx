import React, { createContext, useState, useContext, ReactNode } from 'react';

// Création du contexte
const OverlayContext = createContext<{
  isOpen: boolean;
  openOverlay: () => void;
  closeOverlay: () => void;
} | null>(null);

// Provider qui gère l'état de la modale
export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openOverlay = () => setIsOpen(true);
  const closeOverlay = () => setIsOpen(false);

  return (
    <OverlayContext.Provider value={{ isOpen, openOverlay, closeOverlay }}>
      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-60 z-40 transition-opacity duration-500"></div>
      )}
      {children}
    </OverlayContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte facilement
export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error('useOverlay must be used within an OverlayProvider');
  }
  return context;
};
