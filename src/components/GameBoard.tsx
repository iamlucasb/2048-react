import React, { useEffect, useRef } from 'react';
import Tile from './Tile';
import { wrapGrid } from 'animate-css-grid';
import { useSwipeable } from 'react-swipeable';
import { ITile } from '../models/ITile';

interface Props {
  gameBoard: ITile[];
  handleMove: (arrow: string) => void;
}

/**
 * Plateau de jeu
 * @returns
 */
const GameBoard = ({ gameBoard, handleMove }: Props) => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Gestion du touch
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleMove('ArrowLeft'),
    onSwipedRight: () => handleMove('ArrowRight'),
    onSwipedUp: () => handleMove('ArrowUp'),
    onSwipedDown: () => handleMove('ArrowDown'),
    trackMouse: true,
  });

  useEffect(() => {
    if (gridRef.current) {
      // Appel de wrapGrid pour animer les changements de layout
      wrapGrid(gridRef.current, {
        duration: 100,
        easing: 'backOut',
      });
    }
  }, []);

  // Suppression du scroll
  useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
    };

    const boardElement = gridRef.current;
    if (boardElement) {
      boardElement.addEventListener('touchmove', preventScroll, {
        passive: false,
      });
    }
    return () => {
      if (boardElement) {
        boardElement.removeEventListener('touchmove', preventScroll);
      }
    };
  }, []);

  return (
    <>
      <div
        {...swipeHandlers}
        className="grid grid-cols-1 grid-rows-1">
        <div className="bg-gray-900 p-2 rounded-md grid grid-cols-4 grid-rows-4 gap-2 col-start-1 row-start-1">
          {Array(16)
            .fill(null)
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
    </>
  );
};

export default GameBoard;
