import clsx from 'clsx';
import React from 'react';

interface Props {
  isGameOver: boolean;
  score: number;
}
const GameOver = ({ isGameOver, score }: Props) => {
  return (
    <div
      className={clsx(
        'col-start-1 row-start-1 m-auto transition-all duration-300',
        {
          'opacity-0 scale-0': !isGameOver,
          'opacity-100 scale-100 animate-pop': isGameOver,
        }
      )}>
      <div className="bg-gray-900/95 p-5 rounded-lg flex flex-col items-center">
        <p className="text-purple-500 text-4xl font-extrabold mb-2">
          Game Over
        </p>
        <p className="text-white text-xl mb-4">
          Final score: <span className="font-bold">{score}</span>
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
          Try again !
        </button>
      </div>
    </div>
  );
};

export default GameOver;
