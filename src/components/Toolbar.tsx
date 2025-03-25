import React from 'react';
import './Toolbar.css';

const Toolbar: React.FC = () => {
  return (
    <div className="toolbar">
      <div className="toolbar-title">Tools</div>
      
      <button className="tool-button">
        <span className="icon">➕</span>
        <span className="label">Add Node</span>
      </button>
      
      <button className="tool-button">
        <span className="icon">🔗</span>
        <span className="label">Connect</span>
      </button>
      
      <button className="tool-button">
        <span className="icon">🎨</span>
        <span className="label">Format</span>
      </button>
      
      <button className="tool-button">
        <span className="icon">💾</span>
        <span className="label">Export</span>
      </button>
      
      <div className="separator"></div>
      
      <div className="zoom-controls">
        <button className="zoom-button">-</button>
        <span className="zoom-level">100%</span>
        <button className="zoom-button">+</button>
      </div>
      
      <div className="separator"></div>
      
      <button className="tool-button template-button">
        <span className="icon">📋</span>
        <span className="label">Templates</span>
      </button>
    </div>
  );
};

export default Toolbar;