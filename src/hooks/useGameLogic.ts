import { useEffect, useState } from 'react';

/**
 * Logique de jeu
 * @param size
 * @returns
 */
const useGameLogic = (size = 4) => {
  const [grid, setGrid] = useState<number[]>(Array(size * size).fill(0));

  useEffect(() => {
    setGrid(initGameBoard());
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
      let line: number[] = [];

      // Récupération des lignes
      for (let j = 0; j < size; j++) {
        const index = isColumn ? i + size * j : j + size * i;
        line.push(newGrid[index]);
      }

      // Gestion de l'inversion
      line = isReverse ? line.reverse() : line;

      // Déplacement des lignes
      line = line.filter((e) => e !== 0);

      // Gestion bloque identique collé
      for (let k = 0; k < line.length; k++) {
        if (line[k] === line[k + 1]) {
          line[k] = line[k] * 2;
          line[k + 1] = 0;
        }
      }

      // Suppression des espaces
      line = line.filter((e) => e !== 0);

      // Rajout des 0 dans espaces vides
      for (let m = 0; m < size; m++) {
        if (!(line[m] > 0)) {
          line[m] = 0;
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
      newGrid[getRandomEmptyIndex(newGrid)] = getRandomBaseNumber();
    }
    setGrid([...newGrid]);
  };

  /**
   * Initalisation de la grid
   * @returns
   */
  const initGameBoard = (): number[] => {
    grid[getRandomEmptyIndex(grid)] = getRandomBaseNumber();
    grid[getRandomEmptyIndex(grid)] = getRandomBaseNumber();
    return [...grid];
  };

  /**
   * Récupère un index ramdom
   * @param newGrid
   * @returns
   */
  const getRandomEmptyIndex = (newGrid: number[]): number => {
    let randomIndex = Math.floor(Math.random() * 16);

    if (newGrid[randomIndex] !== 0) {
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

  return { grid, initGameBoard };
};

export default useGameLogic;
