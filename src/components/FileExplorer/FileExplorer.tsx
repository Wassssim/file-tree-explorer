import { useState } from 'react';
import './FileExplorer.css';
import Entry from '../Entry/Entry';
import { ITreeNode } from '../../types/fileExplorerData';
import { addToTree, removeFromTree, renameNode } from '../../algorithms/treeAlgorithms';

interface IFileExplorerProps {
  initialTree: ITreeNode,
  onNodeSelect: (node: ITreeNode) => void
}

function FileExplorer({ initialTree, onNodeSelect }: IFileExplorerProps) {
  const [tree, setTree] = useState<ITreeNode>(initialTree);

  const handleNodeAdd = (folderId: string, node: ITreeNode): void => {
    const newTree = addToTree(tree, folderId, node);
    if (newTree)
      setTree(newTree);
  }

  const handleNodeDelete = (nodeId: string): void => {
    const newTree = removeFromTree(tree, nodeId);
    if (newTree)
      setTree(newTree);
  }

  const handleNodeRename = (nodeId: string, newName: string): void => {
    const newTree = renameNode(tree, nodeId, newName);
    if (newTree)
      setTree(newTree);    
  }

  return (
    <div className='file-explorer'>
      <Entry
        key={tree.id}
        node={tree} 
        depth={0} 
        onNodeAdd={handleNodeAdd} 
        onNodeDelete={handleNodeDelete}
        onNodeRename={handleNodeRename}
        onNodeSelect={onNodeSelect}
      />
    </div>
  )
}

export default FileExplorer
