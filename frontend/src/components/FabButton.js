import React, { useState } from 'react';

const FabButton = ({ actions = [], icon = '+' }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`fab-container ${open ? 'fab-open' : ''}`}>
      {open && actions.map((action, index) => (
        <button
          key={index}
          className="fab-action"
          onClick={() => { action.onClick(); setOpen(false); }}
          title={action.label}
          style={{ transform: `translateY(-${(index + 1) * 56}px)` }}
        >
          <span>{action.icon}</span>
        </button>
      ))}
      <button
        className="fab-main"
        onClick={() => setOpen(!open)}
        aria-label="Actions rapides"
      >
        <span className={`fab-icon ${open ? 'fab-icon-rotate' : ''}`}>{icon}</span>
      </button>
    </div>
  );
};

export default FabButton;
