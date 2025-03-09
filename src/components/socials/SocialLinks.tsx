import React from 'react';

interface SocialLinksProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  linksContainerClassName?: string;
}

/**
 * Composant pour afficher une liste de liens sociaux
 */
const SocialLinks: React.FC<SocialLinksProps> = ({
  children,
  className = '',
  linksContainerClassName = 'flex justify-center space-x-6',
}) => {
  return (
    <div className={className}>
      <div className={linksContainerClassName}>{children}</div>
    </div>
  );
};

export default SocialLinks;
