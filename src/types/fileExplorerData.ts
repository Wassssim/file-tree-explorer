export interface ITreeNode {
    id: number,
    name: string,
    type: "File" | "Folder",
    isOpen?: boolean,
    children?: ITreeNode[]
}