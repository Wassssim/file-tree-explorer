export interface ITreeNode {
    id: string,
    name: string,
    isFolder: boolean,
    isOpen?: boolean,
    visible?:boolean,
    children?: ITreeNode[]
}