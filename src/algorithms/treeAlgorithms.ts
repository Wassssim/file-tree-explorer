import { ITreeNode } from "../types/fileExplorerData";

export const addToTree = (tree: ITreeNode | null, folderId: string, node: ITreeNode): ITreeNode | null => {
    if (!tree)
        return {...node};
    
    if ((tree.isFolder === true) && (tree.id === folderId))
        return { ...tree, children: [...(tree?.children || []), { ...node }] }

    if (!tree.children)
        return tree;

    const newChildren = [];
    for (const childNode of (tree.children || [])) {
        const resultingTree = addToTree(childNode, folderId, node);
        if (resultingTree)
            newChildren.push(resultingTree);
    }

    if (newChildren.length > 0)
        return { ...tree, children: [...newChildren] }

    return tree;
}

export const removeFromTree = (tree: ITreeNode | null, nodeId: string, recursive: boolean = false): ITreeNode | null => {
    if (!tree)
        return null;
    
    if (tree.id === nodeId) {
        if (recursive) {
            tree.children?.map((child: ITreeNode) => removeFromTree(child, child.id));
            console.log("Removing child", tree.name);
        }
        return null;
    }

    const newChildren = (tree.children?.map(childNode => removeFromTree(childNode, nodeId)).filter(x => x !== null) || []) as ITreeNode[];

    if (newChildren.length > 0)
        return { ...tree, children: newChildren }
    
    return tree;
}

export const renameNode = (tree: ITreeNode, nodeId: string, newName: string): ITreeNode => {
    if (tree.id === nodeId)
        return { ...tree, name: newName }

    const newChildren = [];
    for (const childNode of (tree.children || [])) {
        const resultingTree = renameNode(childNode, nodeId, newName);
        if (resultingTree)
            newChildren.push(resultingTree);
    }

    if (newChildren.length > 0)
        return { ...tree, children: newChildren }

    return { ...tree }
}

// DFS
export const findNodeById = (tree: ITreeNode, nodeId: string): ITreeNode | null => {
    if (tree.id === nodeId)
        return tree;
    
    for (let childNode of (tree.children || [])) {
        const node = findNodeById(childNode, nodeId);
        if (node)
            return node;
    }

    return null;
}

export const moveNode = (tree: ITreeNode, sourceNodeId: string, parentDestinationNode: ITreeNode): ITreeNode | null => {
    if (!tree || !parentDestinationNode.isFolder || (sourceNodeId === parentDestinationNode.id))
        return null;
    
    const sourceNode = findNodeById(tree, sourceNodeId);

    if (!sourceNode)
        return null;
    
    return addToTree(removeFromTree(tree, sourceNodeId, false), parentDestinationNode.id, sourceNode);
}