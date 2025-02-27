import clsx from 'clsx';
import React from 'react';

interface Props {
  isGameOver: boolean;
}
const GameOver = ({ isGameOver }: Props) => {
  return (
    <div
      className={clsx('col-start-1 row-start-1 m-auto', {
        collapse: !isGameOver,
      })}>
      <p className="text-white text-4xl rounded p-4 bg-gray-800 opacity-95 font-bold">
        Game Over
      </p>
    </div>
  );
};

export default GameOver;
