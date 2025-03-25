# MindFlow - Interactive Mind Mapping Web App

MindFlow is a collaborative mind mapping web application that allows users to create, edit, and share visual mind maps in real-time. It's perfect for brainstorming sessions, project planning, or organizing thoughts and ideas.

## Features

- **Interactive Canvas**: Create and manipulate mind map nodes with an intuitive drag-and-drop interface
- **Real-time Collaboration**: Work together with team members simultaneously
- **Visual Customization**: Customize nodes with different colors and styles
- **Chat Integration**: Discuss ideas without leaving the mind mapping environment
- **Responsive Design**: Works on desktop and tablet devices

## Tech Stack

- React
- TypeScript
- HTML5 Canvas
- CSS3

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/mindflow.git
cd mindflow
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage Guide

- **Add Nodes**: Double-click anywhere on the canvas to create a new node
- **Connect Nodes**: Select a node, then double-click elsewhere to create a connected node
- **Move Nodes**: Click and drag nodes to reposition them
- **Collaborate**: Invite team members to join your session for real-time collaboration
- **Chat**: Use the integrated chat panel to discuss ideas without switching applications

## Project Structure

```
mindflow/
├── public/
├── src/
│   ├── components/
│   │   ├── MindMap.tsx         # Core mind mapping canvas
│   │   ├── Toolbar.tsx         # Tools and controls
│   │   └── CollaborationPanel.tsx # Real-time collaboration features
│   ├── types/
│   │   └── mindmap.ts          # TypeScript type definitions
│   ├── App.tsx                 # Main application component
│   └── index.tsx               # Entry point
└── README.md
```

## Future Enhancements

- Export to various formats (PDF, PNG, SVG)
- Templates for different mind mapping scenarios
- Advanced styling options
- Mobile support with touch interactions
- Integration with cloud storage services
- Version history and undo/redo functionality

## License

MIT