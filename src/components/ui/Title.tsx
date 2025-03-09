import React from 'react';

interface TitleProps {
  text: string;
  className?: string;
  from?: string;
  to?: string;
  as?: 'h1' | 'h2';
}

/**
 * Composant Title réutilisable avec un dégradé de couleur
 */
const Title: React.FC<TitleProps> = ({ text, className = '', as = 'h1' }) => {
  const HeadingTag = as;
  return (
    <HeadingTag
      className={`${
        as === 'h1' ? 'text-5xl' : 'text-4xl'
      } font-bold ${className}`}>
      <span
        className={`text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500`}>
        {text}
      </span>
    </HeadingTag>
  );
};

export default Title;
