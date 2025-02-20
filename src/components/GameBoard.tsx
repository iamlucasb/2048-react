import React from 'react';
import Tile from './Tile';
import useGameLogic from '../hooks/useGameLogic';

/**
 * Plateau de jeu
 * @returns
 */
const GameBoard = () => {
  const { grid } = useGameLogic();

  return (
    <div className="bg-gray-900 p-2 rounded-md grid grid-cols-4 grid-rows-4 gap-2">
      {grid.map((tile) => (
        <Tile
          tile={tile}
          key={tile.id}></Tile>
      ))}
    </div>
  );
};

export default GameBoard;
