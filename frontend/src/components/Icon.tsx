import React from 'react';
import { DEFAULT_ICON_SIZE } from '../utils/constants';

function Icon({
  children,
  iconSize,
}: {
  children: React.ReactNode;
  iconSize?: number;
}) {
  iconSize = iconSize || DEFAULT_ICON_SIZE;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-images"
      viewBox={`0 0 ${iconSize || iconSize} ${iconSize}`}
    >
      {children}
    </svg>
  );
}

export default Icon;
