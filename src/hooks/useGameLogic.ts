import { useCallback, useEffect, useState } from 'react';
import { ITile } from '../models/ITile';

/**
 * Logique de jeu
 * @param size
 * @returns
 */
const useGameLogic = (size = 4) => {
  const [gameBoard, setGameBoard] = useState<ITile[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    initGameBoard();
  }, []);

  const hasChanged = (line1: ITile[], line2: ITile[]): boolean => {
    return line1.some((tile, index) => tile.value !== line2[index].value);
  };

  const moveZeroTile = (line: ITile[]): ITile[] => {
    const nonZeros = line.filter((tile) => tile.value !== 0);
    const zeros = line.filter((tile) => tile.value === 0);
    return [...nonZeros, ...zeros];
  };

  const addRandomTile = (grid: ITile[]): void => {
    const tile: ITile = grid[getRandomEmptyIndex(grid)];
    tile.value = getRandomBaseNumber();
    tile.isNew = true;
  };

  /**
   * Gestion des mouvements
   * @param arrow
   */
  const handleMove = useCallback(
    (arrow: string): void => {
      setGameBoard((prevGameBoard) => {
        // Création d'une copie de la grille actuelle
        const newGrid = prevGameBoard.map((tile) => ({ ...tile }));
        let roundScore = 0;

        // Réinitialisation des flags d'animation
        newGrid.forEach((tile) => {
          tile.isNew = false;
          tile.isMerged = false;
        });

        const isColumn = arrow === 'ArrowUp' || arrow === 'ArrowDown';
        const isReverse = arrow === 'ArrowRight' || arrow === 'ArrowDown';
        let canAddNewTile = false;

        for (let i = 0; i < size; i++) {
          let line: ITile[] = [];

          // Récupération d'une ligne ou d'une colonne selon le mouvement
          for (let j = 0; j < size; j++) {
            const index = isColumn ? i + size * j : j + size * i;
            line.push(newGrid[index]);
          }

          // Si le mouvement est vers la droite ou le bas, on inverse la ligne
          if (isReverse) {
            line = line.reverse();
          }

          // Déplacement : on pousse les tuiles non nulles vers le début
          let tmpLine = moveZeroTile(line);
          if (hasChanged(line, tmpLine)) {
            canAddNewTile = true;
          }
          line = tmpLine;

          // Fusion : fusionner les tuiles adjacentes identiques
          for (let k = 0; k < line.length - 1; k++) {
            if (line[k].value === line[k + 1].value && line[k].value > 0) {
              line[k].value *= 2;
              line[k].isMerged = true;
              line[k + 1].value = 0;
              canAddNewTile = true;

              // Mise à jour du score
              roundScore = roundScore + line[k].value;
            }
          }

          // Déplacement après fusion pour compacter la ligne
          tmpLine = moveZeroTile(line);
          if (hasChanged(line, tmpLine)) {
            canAddNewTile = true;
          }
          line = tmpLine;

          // Réinversion si nécessaire pour restaurer l'ordre
          if (isReverse) {
            line = line.reverse();
          }

          // Ajout des coordonées et dans la grid
          for (let j = 0; j < size; j++) {
            const index = isColumn ? i + size * j : j + size * i;
            newGrid[index] = {
              ...line[j],
              row: isColumn ? j : i,
              col: isColumn ? i : j,
            };
          }
        }

        // Ajout d'une nouvelle tuile si un mouvement a eu lieu
        if (canAddNewTile) {
          setTimeout(() => {
            addRandomTile(newGrid);
            setGameBoard([...newGrid]);
          }, 200);
        }

        // Mise à jour du score
        setScore((prev) => prev + roundScore);

        return newGrid;
      });
    },
    [size, moveZeroTile, hasChanged, addRandomTile]
  );

  // Attacher l'écouteur une seule fois
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)
      ) {
        handleMove(event.key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove]); // L'effet ne se réexécute que si handleMove change

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
          id: crypto.randomUUID(),
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

    setGameBoard(newGrid);
  };

  /**
   * Récupère un index ramdom
   * @param newGrid
   * @returns
   */
  const getRandomEmptyIndex = (grid: ITile[]): number => {
    const emptyIndices = grid.reduce((acc: number[], tile, index) => {
      if (tile.value === 0) acc.push(index);
      return acc;
    }, []);
    if (emptyIndices.length === 0) return -1; // ou gérer le Game Over
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  };

  /**
   * Récupère le nombre à ajouter dans une tuile.
   * @returns
   */
  const getRandomBaseNumber = (): number => {
    const random = Math.floor(Math.random() * 100);
    return random > 20 ? 2 : 4;
  };

  return { gameBoard, score, handleMove };
};

export default useGameLogic;
