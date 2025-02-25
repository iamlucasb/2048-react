import clsx from 'clsx';
import React from 'react';
import { ITile } from '../models/ITile';

interface Props {
  tile: ITile;
}
const Tile = ({ tile }: Props) => {
  return (
    <div
      className={clsx('h-16 w-16 rounded flex justify-center items-center', {
        'bg-gray-700': tile.value === 0,
        'bg-green-300': tile.value === 2,
        'bg-green-400': tile.value === 4,
        'bg-lime-400': tile.value === 8,
        'bg-yellow-400': tile.value === 16,
        'bg-orange-400': tile.value === 32,
        'bg-red-400': tile.value === 64,
        'bg-pink-500': tile.value === 128,
        'bg-fuchsia-500': tile.value === 256,
        'bg-purple-400': tile.value === 512,
        'bg-blue-500': tile.value === 1024,
        'bg-cyan-500': tile.value >= 2048,
        'animate-merge': tile.isMerged,
        'animate-pop': tile.isNew,
        collapse: tile.value === 0,
      })}
      style={{
        gridColumnStart: tile.col + 1,
        gridRowStart: tile.row + 1,
      }}>
      <p className="text-xl text-white font-bold">
        {tile.value ? tile.value : ''}
      </p>
    </div>
  );
};

export default Tile;
