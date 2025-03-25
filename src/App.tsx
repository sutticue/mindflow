import React from 'react';
import './App.css';
import MindMap from './components/MindMap';
import Toolbar from './components/Toolbar';
import CollaborationPanel from './components/CollaborationPanel';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>MindFlow - Interactive Mind Mapping</h1>
        <div className="user-controls">
          <button className="share-button">Share</button>
          <button className="save-button">Save</button>
          <div className="user-avatar">
            <img src="/avatar-placeholder.png" alt="User" />
          </div>
        </div>
      </header>
      
      <div className="main-content">
        <Toolbar />
        <MindMap />
        <CollaborationPanel />
      </div>
      
      <footer className="app-footer">
        <p>MindFlow - Collaborative Mind Mapping © 2025</p>
      </footer>
    </div>
  );
}

export default App;