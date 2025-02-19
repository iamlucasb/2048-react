import React from 'react';
import Tile from './Tile';

/**
 *
 * @returns
 */
const GameBoard = () => {
  return (
    <div className="bg-gray-900 p-2 rounded-md grid grid-cols-4 grid-rows-4 gap-2">
      <Tile value={0}></Tile>
      <Tile value={2}></Tile>
      <Tile value={4}></Tile>
      <Tile value={8}></Tile>
      <Tile value={16}></Tile>
      <Tile value={32}></Tile>
      <Tile value={64}></Tile>
      <Tile value={128}></Tile>
      <Tile value={256}></Tile>
      <Tile value={512}></Tile>
      <Tile value={1024}></Tile>
      <Tile value={2048}></Tile>
      <Tile value={0}></Tile>
      <Tile value={0}></Tile>
      <Tile value={0}></Tile>
      <Tile value={0}></Tile>
    </div>
  );
};

export default GameBoard;
