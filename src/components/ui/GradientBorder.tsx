import clsx from 'clsx';
import React from 'react';

interface GradientBorderProps {
  onFocus?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Bordure avec un dégradé de couleur
 */
const GradientBorder = ({
  onFocus = false,
  children,
  className = '',
}: GradientBorderProps) => {
  return (
    <div
      className={clsx(
        'bg-transparent from-orange-500 to-pink-500 p-0.5 rounded-lg mb-4',
        className,
        { 'focus-within:bg-gradient-to-r': onFocus },
        { 'bg-gradient-to-r': !onFocus }
      )}>
      {children}
    </div>
  );
};

export default GradientBorder;
