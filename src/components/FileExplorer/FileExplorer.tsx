import { useState } from 'react';
import './FileExplorer.css';
import Entry from '../Entry/Entry';
import { ITreeNode } from '../../types/fileExplorerData';

interface IFileExplorerProps {
  initialTree: ITreeNode;
}

function FileExplorer({ initialTree }: IFileExplorerProps) {
  const [tree, setTree] = useState<ITreeNode>(initialTree);

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

  const removeFromTree = (tree: ITreeNode, nodeId: string): ITreeNode | null => {
    if (tree.id === nodeId) {
      tree.children?.map((child: ITreeNode) => removeFromTree(child, child.id));
      console.log("Removing child", tree.name);
      return null;
    }
    
    const newChildren = [];
    for (const childNode of (tree.children || [])) {
      const resultingTree = removeFromTree(childNode, nodeId);
      if (resultingTree)
        newChildren.push(resultingTree);
    }

    return {...tree, children: newChildren}
  }

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

  return (
    <div className='file-explorer'>
      <Entry 
        node={tree} 
        depth={0} 
        onNodeAdd={handleNodeAdd} 
        onNodeDelete={handleNodeDelete}
      />
    </div>
  )
}

export default FileExplorer