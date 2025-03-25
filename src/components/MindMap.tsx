import React, { useRef, useEffect, useState } from 'react';
import './MindMap.css';
import { Node, Connection } from '../types/mindmap';

const MindMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', text: 'Main Idea', x: 400, y: 300, color: '#ff7675' },
    { id: '2', text: 'Concept 1', x: 200, y: 200, color: '#74b9ff' },
    { id: '3', text: 'Concept 2', x: 600, y: 200, color: '#55efc4' },
    { id: '4', text: 'Concept 3', x: 200, y: 400, color: '#fdcb6e' },
    { id: '5', text: 'Concept 4', x: 600, y: 400, color: '#a29bfe' },
  ]);
  
  const [connections, setConnections] = useState<Connection[]>([
    { from: '1', to: '2' },
    { from: '1', to: '3' },
    { from: '1', to: '4' },
    { from: '1', to: '5' },
  ]);
  
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [dragNode, setDragNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Function to draw the mind map on canvas
  const drawMindMap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections
    connections.forEach(conn => {
      const fromNode = nodes.find(n => n.id === conn.from);
      const toNode = nodes.find(n => n.id === conn.to);
      
      if (fromNode && toNode) {
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
    
    // Draw nodes
    nodes.forEach(node => {
      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, 40, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();
      
      // Highlight active node
      if (node.id === activeNode) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 43, 0, Math.PI * 2);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      
      // Node text
      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.text, node.x, node.y);
    });
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if a node was clicked
    for (const node of nodes) {
      const dx = node.x - x;
      const dy = node.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance <= 40) {
        setActiveNode(node.id);
        setDragNode(node.id);
        setDragOffset({ x: x - node.x, y: y - node.y });
        return;
      }
    }
    
    setActiveNode(null);
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragNode) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setNodes(nodes.map(node => {
      if (node.id === dragNode) {
        return {
          ...node,
          x: x - dragOffset.x,
          y: y - dragOffset.y
        };
      }
      return node;
    }));
  };
  
  const handleMouseUp = () => {
    setDragNode(null);
  };
  
  const handleDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create new node on double click
    const id = Date.now().toString();
    const colors = ['#ff7675', '#74b9ff', '#55efc4', '#fdcb6e', '#a29bfe'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const newNode = { id, text: 'New Idea', x, y, color };
    setNodes([...nodes, newNode]);
    
    // If a node is active, connect it to the new node
    if (activeNode) {
      setConnections([...connections, { from: activeNode, to: id }]);
    }
    
    setActiveNode(id);
  };

  // Listen for canvas size changes and resize accordingly
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      
      drawMindMap();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  // Draw the mind map whenever nodes or connections change
  useEffect(() => {
    drawMindMap();
  }, [nodes, connections, activeNode]);

  return (
    <div className="mind-map-container">
      <canvas
        ref={canvasRef}
        className="mind-map-canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleDoubleClick}
      />
      <div className="instructions">
        <p>🖱️ Double-click to add a new idea</p>
        <p>🔄 Drag nodes to rearrange</p>
        <p>🔗 Select a node then double-click elsewhere to create connection</p>
      </div>
    </div>
  );
};

export default MindMap;