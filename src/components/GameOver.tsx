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
        'col-start-1 row-start-1 z-50 flex items-center justify-center transition-all duration-300',
        {
          'pointer-events-none': !isGameOver,
          'pointer-events-auto': isGameOver,
        }
      )}>
      {/* Game over modal - stays above the overlay */}
      <div
        className={clsx('relative z-50 transition-all duration-300', {
          'opacity-0 scale-0': !isGameOver,
          'opacity-100 scale-100 animate-pop': isGameOver,
        })}>
        <div className="bg-gray-900 p-5 rounded-lg flex flex-col items-center shadow-xl border-3 border-orange-500">
          <p className="text-orange-500 text-4xl font-extrabold mb-2">
            Game Over
          </p>
          <p className="text-white text-xl mb-4">
            Final score: <span className="font-bold">{score}</span>
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
            Try again !
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
