import { useEffect, useState } from 'react';

const useGameLogic = (size = 4) => {
  const [grid, setGrid] = useState<number[]>(Array(size * size).fill(0));

  useEffect(() => {
    setGrid(initGameBoard());
  }, []);

  const initGameBoard = (): number[] => {
    grid[getRandomEmptyIndex()] = getRandomBaseNumber();
    grid[getRandomEmptyIndex()] = getRandomBaseNumber();
    return [...grid];
  };

  const getRandomEmptyIndex = (): number => {
    let randomIndex = Math.floor(Math.random() * 16);

    if (grid[randomIndex] !== 0) {
      randomIndex = getRandomEmptyIndex();
    }
    return randomIndex;
  };

  const getRandomBaseNumber = (): number => {
    const random = Math.floor(Math.random() * 2) + 1;
    return 2 * random;
  };

  return { grid, initGameBoard };
};

export default useGameLogic;
