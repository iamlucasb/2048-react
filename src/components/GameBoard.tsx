import React, { useEffect, useRef } from 'react';
import Tile from './Tile';
import useGameLogic from '../hooks/useGameLogic';
import { wrapGrid } from 'animate-css-grid';

/**
 * Plateau de jeu
 * @returns
 */
const GameBoard = () => {
  const { gameBoard } = useGameLogic();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      // Appel de wrapGrid pour animer les changements de layout
      wrapGrid(gridRef.current, {
        duration: 100,
        easing: 'backOut',
      });
    }
  }, []);

  return (
    <div className="grid grid-cols-1 grid-rows-1">
      <div className="bg-gray-900 p-2 rounded-md grid grid-cols-4 grid-rows-4 gap-2 col-start-1 row-start-1">
        {Array(16)
          .fill(0)
          .map((tile, index) => (
            <div
              key={index}
              className="h-16 w-16 rounded flex justify-center items-center bg-gray-700"
            />
          ))}
      </div>

      <div
        ref={gridRef}
        className="p-2 rounded-md grid grid-cols-4 grid-rows-4 gap-2 col-start-1 row-start-1 transition-all duration-200 ease-in-out">
        {gameBoard.map((tile) => (
          <Tile
            tile={tile}
            key={tile.id}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
