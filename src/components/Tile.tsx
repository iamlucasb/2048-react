import clsx from 'clsx';
import React from 'react';

interface Props {
  value: number;
}
const Tile = ({ value = 0 }: Props) => {
  return (
    <div
      className={clsx('h-16 w-16 rounded flex justify-center items-center', {
        'bg-gray-700': value === 0,
        'bg-green-300': value === 2,
        'bg-green-400': value === 4,
        'bg-lime-400': value === 8,
        'bg-yellow-400': value === 16,
        'bg-orange-400': value === 32,
        'bg-red-400': value === 64,
        'bg-pink-500': value === 128,
        'bg-fuchsia-500': value === 256,
        'bg-purple-400': value === 512,
        'bg-blue-500': value === 1024,
        'bg-cyan-500': value >= 2048,
      })}>
      <p className="text-xl text-white font-bold">{value > 0 ? value : ''}</p>
    </div>
  );
};

export default Tile;
