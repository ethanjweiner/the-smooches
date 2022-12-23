import React from 'react';
import { ICON_SIZE } from '../utils/constants';

function Icon(props: { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={ICON_SIZE}
      height={ICON_SIZE}
      fill="currentColor"
      className="bi bi-images"
      viewBox={`0 0 ${ICON_SIZE} ${ICON_SIZE}`}
    >
      {props.children}
    </svg>
  );
}

export default Icon;
