import React, { useEffect, useCallback, useRef, useState } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

const ShotRange: number = 1000;

interface Props {
  score: number;
}

const Score = ({ score }: Props) => {
  const scoreRef = useRef<HTMLDivElement>(null);
  const refAnimationInstance = useRef<any>(null);
  const [lastShot, setLastShot] = useState(0);

  const makeShot = useCallback(() => {
    const instance = refAnimationInstance.current;
    const scoreElement = scoreRef.current;
    if (instance && scoreElement) {
      const rect = scoreElement.getBoundingClientRect();
      const docWidth = document.documentElement.clientWidth;
      const docHeight = document.documentElement.clientHeight;

      instance({
        spread: 45,
        startVelocity: 15,
        particleCount: 30,
        scalar: 0.7,
        ticks: 35,
        origin: {
          x: (rect.left + rect.width / 2) / docWidth,
          y: (rect.top + rect.height) / docHeight,
        },
        colors: ['#f87171', '#facc15', '#4ade80', '#3b82f6', '#ec4899'],
      });
    }
  }, []);

  useEffect(() => {
    if (Math.floor(score / ShotRange) > lastShot) {
      setLastShot(Math.floor(score / ShotRange));
      makeShot();
      setTimeout(makeShot, 150);
      setTimeout(makeShot, 300);
    }
  }, [score, makeShot, lastShot]);

  return (
    <div
      className="relative"
      ref={scoreRef}>
      <div className="rounded p-4 bg-gray-800">
        <p className="text-center text-gray-400 text-xl font-bold">Score</p>
        <p className="text-center text-white text-lg font-bold">{score}</p>
      </div>
      <ReactCanvasConfetti
        onInit={(instance) =>
          (refAnimationInstance.current = instance.confetti)
        }
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          width: '200px',
          height: '200px',
          top: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  );
};

export default Score;
