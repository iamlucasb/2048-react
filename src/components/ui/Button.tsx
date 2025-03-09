import clsx from 'clsx';
import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

/**
 * Composant Button réutilisable avec deux variantes : primaire (positive) et secondaire (négative)
 */
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  onClick,
  children,
  className = '',
  ...props
}) => {
  const baseClasses =
    'px-4 py-2 text-white rounded-lg transition-colors duration-200';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400',
    secondary: 'bg-gray-600 hover:bg-gray-700',
  };

  return (
    <button
      onClick={onClick}
      className={clsx(baseClasses, variantClasses[variant], className)}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
