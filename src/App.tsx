import { useState } from 'react';
import './App.css';
import Entry from './components/Entry';
import { ITreeNode } from './types/fileExplorerData';

function App() {
  const [tree, setTree] = useState<ITreeNode>({
    id: 0,
    name: "Folder1",
    type: "Folder",
    isOpen: true,
    children: [{ id: 1, name: "file1.txt", type: "File"}, { id: 2, name: "file2.jpeg", type: "File"}]
  });

  const handleNodeClick = (node: ITreeNode) => {
    if (node.type === "File")
      return;
    //setTree(nodes => nodes.map(node => ))
  }

  return (
    <div className="App">
      <div className='file-explorer'>
        <Entry node={tree} depth={0} onNodeClick={handleNodeClick} />
      </div>
    </div>
  )
}

export default App
