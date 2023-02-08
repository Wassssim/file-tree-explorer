import { ITreeNode } from "../types/fileExplorerData";

export const addToTree = (tree: ITreeNode, folderId: string, node: ITreeNode): ITreeNode | null => {
    if ((tree.isFolder === true) && (tree.id === folderId))
        return { ...tree, children: [...(tree?.children || []), { ...node }] }

    if (!tree.children)
        return { ...tree };

    const newChildren = [];
    for (const childNode of (tree.children || [])) {
        const resultingTree = addToTree(childNode, folderId, node);
        if (resultingTree)
            newChildren.push(resultingTree);
    }

    if (newChildren.length > 0)
        return { ...tree, children: [...newChildren] }

    return { ...tree };
}

export const removeFromTree = (tree: ITreeNode, nodeId: string): ITreeNode | null => {
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

    return { ...tree, children: newChildren }
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