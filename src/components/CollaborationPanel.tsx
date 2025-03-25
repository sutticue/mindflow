import React, { useState } from 'react';
import './CollaborationPanel.css';

type Collaborator = {
  id: string;
  name: string;
  avatar: string;
  color: string;
  online: boolean;
};

type ChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
};

const CollaborationPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<'collaborators' | 'chat'>('collaborators');
  const [message, setMessage] = useState('');
  
  const collaborators: Collaborator[] = [
    { id: '1', name: 'You', avatar: '/avatar-placeholder.png', color: '#ff7675', online: true },
    { id: '2', name: 'Alex Kim', avatar: '/avatar-2.png', color: '#74b9ff', online: true },
    { id: '3', name: 'Jordan Smith', avatar: '/avatar-3.png', color: '#55efc4', online: false }
  ];
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: '2',
      senderName: 'Alex Kim',
      message: 'I think we should add another section for market research',
      timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
    },
    {
      id: '2',
      senderId: '1',
      senderName: 'You',
      message: 'Good idea, I\'ll start working on it',
      timestamp: new Date(Date.now() - 1000 * 60 * 3) // 3 minutes ago
    }
  ]);
  
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        senderId: '1',
        senderName: 'You',
        message: message,
        timestamp: new Date()
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };
  
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className={`collaboration-panel ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="panel-header">
        <h3>Collaboration</h3>
        <button className="toggle-button" onClick={toggleExpand}>
          {isExpanded ? '»' : '«'}
        </button>
      </div>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'collaborators' ? 'active' : ''}`} 
          onClick={() => setActiveTab('collaborators')}
        >
          People (3)
        </button>
        <button 
          className={`tab ${activeTab === 'chat' ? 'active' : ''}`} 
          onClick={() => setActiveTab('chat')}
        >
          Chat
        </button>
      </div>
      
      <div className="panel-content">
        {activeTab === 'collaborators' ? (
          <div className="collaborators-list">
            {collaborators.map(user => (
              <div key={user.id} className="collaborator">
                <div className="collaborator-avatar">
                  <img src={user.avatar} alt={user.name} />
                  <span className={`status-indicator ${user.online ? 'online' : 'offline'}`}></span>
                </div>
                <div className="collaborator-info">
                  <div className="collaborator-name">{user.name}</div>
                  <div className="collaborator-activity">
                    {user.online ? 'Active now' : 'Away'}
                  </div>
                </div>
                <div className="collaborator-color" style={{ backgroundColor: user.color }}></div>
              </div>
            ))}
            
            <button className="invite-button">
              <span className="plus-icon">+</span>
              Invite Collaborator
            </button>
          </div>
        ) : (
          <div className="chat-container">
            <div className="messages">
              {messages.map(msg => (
                <div key={msg.id} className={`message ${msg.senderId === '1' ? 'outgoing' : 'incoming'}`}>
                  <div className="message-header">
                    <span className="sender-name">{msg.senderName}</span>
                    <span className="message-time">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="message-content">{msg.message}</div>
                </div>
              ))}
            </div>
            
            <div className="message-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborationPanel;