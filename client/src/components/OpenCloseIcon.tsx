import React from 'react';

type OpenCloseIconProps = {
  isOpen: boolean;
  color?: string;
  stroke?: number;
  size: number;
};

const OpenCloseIcon = ({ isOpen, color, stroke, size }: OpenCloseIconProps) => {
  // Common Style for lines
  const commonStyle: React.CSSProperties = {
    height: stroke ?? 1,
    width: size,
    left: isOpen
      ? (size - Math.sqrt(Math.pow(size + (stroke ?? 1), 2) / 2)) / 2
      : 0,
    display: 'block',
    position: 'absolute',
    transformOrigin: 'left center',
    transition: '.25s ease-in-out',
    borderRadius: size,
    opacity: 1,
    background: color ?? 'black',
  };
  return (
    <div className="flex">
      <div
        className="my-auto"
        style={{
          width: size,
          height: size * 0.75,
          position: 'relative',
          transform: 'rotate(0)',
          transition: '0.5s ease-in-out',
        }}
      >
        <span
          style={{
            ...commonStyle,
            top: isOpen ? (stroke ?? 1) / 2 : 0,
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
            color: 'red',
          }}
        ></span>
        <span
          style={{
            ...commonStyle,
            top: (size * 0.75) / 2,
            width: isOpen ? '0' : size,
            opacity: isOpen ? 0 : 1,
            color: 'yellow',
          }}
        ></span>
        <span
          style={{
            ...commonStyle,
            top: isOpen ? size * 0.75 - (stroke ?? 1) / 2 : size * 0.75,
            transform: isOpen ? 'rotate(-45deg)' : 'rotate(0)',
            color: 'blue',
          }}
        ></span>
      </div>
    </div>
  );
};

export default OpenCloseIcon;
