import React from 'react';

const DropCap = ({ children }) => {
  if (!children || typeof children !== 'string') return <p>{children}</p>;
  const firstLetter = children.charAt(0);
  const rest = children.slice(1);
  return (
    <p className="drop-cap">
      {firstLetter}{rest}
    </p>
  );
};

export default DropCap;
