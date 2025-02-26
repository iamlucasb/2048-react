import React from 'react';

interface Props {
  score: number;
}
const Score = ({ score }: Props) => {
  return (
    <div className="rounded p-4 bg-gray-800">
      <p className="text-center text-gray-400 text-xl font-bold">Score</p>
      <p className="text-center text-white text-lg font-bold">{score}</p>
    </div>
  );
};

export default Score;
