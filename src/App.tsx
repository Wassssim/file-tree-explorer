import { useState } from 'react';
import './App.css';
import Entry from './components/Entry';
import { ITreeNode } from './types/fileExplorerData';

function App() {
  const [tree, setTree] = useState<ITreeNode>({
    id: "0",
    name: "Folder1",
    isFolder: true,
    isOpen: true,
    children: [{ id: "1", name: "file1.txt", isFolder: false}, { id: "2", name: "file2.jpeg", isFolder: false}]
  });

  const addToTree = (tree: ITreeNode, folderId: string, node: ITreeNode): ITreeNode | null => {
    if ((tree.isFolder === true) && (tree.id === folderId))
      return {...tree, children: [...(tree?.children || []), {...node}]}
    
    if (!tree.children)
      return {...tree};
    
    const newChildren = [];
    for (const childNode of (tree.children || [])) {
      const resultingTree = addToTree(childNode, folderId, node);
      if (resultingTree)
        newChildren.push(resultingTree);
    }

    if (newChildren.length > 0)
      return {...tree, children: [...newChildren]}
    
    return {...tree};
  }

  const handleNodeAdd = (folderId: string, node: ITreeNode) => {
    const newTree = addToTree(tree, folderId, node);
    if (newTree)
      setTree(newTree);
  }

  return (
    <div className="App">
      <div className='file-explorer'>
        <Entry node={tree} depth={0} onNodeAdd={handleNodeAdd} />
      </div>
    </div>
  )
}

export default App
