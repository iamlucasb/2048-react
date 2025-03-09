import React from 'react';

interface SocialLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Composant pour un lien social avec une icône
 */
const SocialLink: React.FC<SocialLinkProps> = ({ href, children, className = '' }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-gray-300 hover:text-white transition-colors duration-200 ${className}`}>
      {children}
    </a>
  );
};

export default SocialLink;
