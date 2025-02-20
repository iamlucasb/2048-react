import { useEffect, useState } from 'react';
import { ITile } from '../models/ITile';

/**
 * Logique de jeu
 * @param size
 * @returns
 */
const useGameLogic = (size = 4) => {
  const [grid, setGrid] = useState<ITile[]>([]);

  useEffect(() => {
    initGameBoard();
  }, []);

  /**
   * Ajout de l'event pour les touches
   */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)
      ) {
        handleMove(event.key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [grid]);

  /**
   * Gestion des mouvements
   * @param arrow
   */
  const handleMove = (arrow: string): void => {
    let newGrid = [...grid];

    const isColumn = arrow === 'ArrowUp' || arrow === 'ArrowDown';
    const isReverse = arrow === 'ArrowRight' || arrow === 'ArrowDown';

    for (let i = 0; i < size; i++) {
      let line: ITile[] = [];

      // Récupération des lignes
      for (let j = 0; j < size; j++) {
        const index = isColumn ? i + size * j : j + size * i;
        line.push(newGrid[index]);
      }

      // Gestion de l'inversion
      line = isReverse ? line.reverse() : line;

      let nonZeroIndex = 0;
      // Déplace tous les éléments non nuls à l'avant
      for (let i = 0; i < line.length; i++) {
        if (line[i].value !== 0) {
          [line[nonZeroIndex], line[i]] = [line[i], line[nonZeroIndex]];
          nonZeroIndex++;
        }
      }

      // Gestion bloque identique collé
      for (let k = 0; k < line.length; k++) {
        if (line[k].value === line[k + 1]?.value) {
          line[k].value = line[k].value * 2;
          line[k].isMerged = true;
          line[k + 1].value = 0;
        }
      }

      // Inversion avant l'ajout
      line = isReverse ? line.reverse() : line;

      // Récupération des lignes
      for (let j = 0; j < size; j++) {
        const index = isColumn ? i + size * j : j + size * i;
        newGrid[index] = line[j];
      }
    }

    // Ajout d'une nouvelle tuile si il y a eu un mouvement
    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
      addRandomTile(newGrid);
    }
    setGrid([...newGrid]);
  };

  /**
   * Initalisation de la grid
   * @returns
   */
  const initGameBoard = (): void => {
    let newGrid: ITile[] = [];

    // Remplissage de la grille avec des tuiles vides
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        newGrid.push({
          id: `${row}-${col}`, // Identifiant basé sur les coordonnées
          value: 0, // 0 signifie une case vide
          row,
          col,
          isNew: false,
          isMerged: false,
        });
      }
    }

    addRandomTile(newGrid);
    addRandomTile(newGrid);

    setGrid(newGrid);
  };

  const addRandomTile = (grid: ITile[]): void => {
    const tile: ITile = grid[getRandomEmptyIndex(grid)];
    tile.value = getRandomBaseNumber();
    tile.isNew = true;
  };

  /**
   * Récupère un index ramdom
   * @param newGrid
   * @returns
   */
  const getRandomEmptyIndex = (newGrid: ITile[]): number => {
    let randomIndex = Math.floor(Math.random() * 16);

    if (newGrid[randomIndex].value !== 0) {
      randomIndex = getRandomEmptyIndex(newGrid);
    }
    return randomIndex;
  };

  /**
   * Récupère le nombre à ajouter dans une tuile.
   * @returns
   */
  const getRandomBaseNumber = (): number => {
    const random = Math.floor(Math.random() * 100);
    return random > 20 ? 2 : 4;
  };

  return { grid };
};

export default useGameLogic;
