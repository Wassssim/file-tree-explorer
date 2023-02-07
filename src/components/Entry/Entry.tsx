import { useState, KeyboardEvent, ChangeEvent } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import { ITreeNode } from '../../types/fileExplorerData';
import './Entry.css';

interface EntryProps {
	node: ITreeNode,
	depth: number,
	onNodeAdd: (folderId: string, node: ITreeNode) => void,
	onNodeDelete: (nodeId: string) => void,
	onNodeRename: (nodeId: string, newName: string) => void
	onNodeSelect: (node: ITreeNode) => void
}

export default function Entry({ node, depth, onNodeAdd, onNodeDelete, onNodeRename, onNodeSelect }: EntryProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [newNode, setNewNode] = useState<ITreeNode>({
		id: "-1",
		visible: false,
		isFolder: false,
		name: ""
	});
	const [renamedNode, setRenamedNode] = useState<ITreeNode | null>(null);

	const handleEntryClick = (e: any) => {
		onNodeSelect(node);
		setIsOpen(!isOpen);
	}

	const handleNewEntry = (e: any, isFolder: boolean) => {
		e.stopPropagation();
		setNewNode({
			id: "-1",
			name: "",
			isFolder,
			visible: true
		});
		if (!isOpen)
			setIsOpen(true);
	}

	const handleNodeStartRename = (e: any) => {
		e.stopPropagation();
		setRenamedNode({
			id: "-1",
			name: node.name,
			isFolder: node.isFolder,
			visible: true
		})
	}

	const handleNodeRename = (e: KeyboardEvent<HTMLInputElement>) => {
		if ((e.key === "Enter") && (renamedNode?.name)) {
			if (node.name !== renamedNode?.name)
				onNodeRename(node.id, renamedNode?.name);
			setRenamedNode(null);
		}
	}

	const handleAddEntry = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onNodeAdd(node.id, { ...newNode, id: uuidv4() });
			setNewNode({ ...node, visible: false, name: "" });
		}
	}

	const handleCancelAdd = (e: any) => {
		e.stopPropagation();
		setNewNode({ ...newNode, visible: false });
	}

	const handleInputChange = (e: any) => {
		setNewNode({ ...newNode, name: e.target.value });
	}

	return <>
		<div
			onClick={handleEntryClick}
			className="entry"
		>
			<div className='entry-name'>
				{node.isFolder ? <FolderIcon /> : <InsertDriveFileIcon />}
				{renamedNode === null
					?
					<span onClick={handleNodeStartRename}>{node.name}</span>
					:
					<input
						type ="text"
						className='entry-input'
						onBlur={(_) => setRenamedNode(null)}
						onKeyUp={handleNodeRename}
						value={renamedNode.name}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {setRenamedNode({...renamedNode, name: e.target.value})}}
						autoFocus
					/>
				}
			</div>
			<div className='entry-buttons'>
				{node.isFolder && <>
					<span className='icon-button' onClick={(e) => handleNewEntry(e, false)}><NoteAddOutlinedIcon /></span>
					<span><CreateNewFolderOutlinedIcon onClick={(e) => handleNewEntry(e, true)} /></span>
				</>}
				<span><DeleteIcon onClick={(e) => onNodeDelete(node.id)} /></span>
			</div>
		</div>
		<div style={{ paddingLeft: `${(depth + 1) * 10}px`, borderLeft: "1px solid var(--secondary-bg-color)", display: "flex", flexDirection: "column", alignContent: "flex-start" }}>
			{isOpen
				&& node.children?.map((childNode: ITreeNode) =>
					<Entry 
						key={childNode.id}
						node={childNode}
						depth={depth + 1}
						onNodeAdd={onNodeAdd} 
						onNodeDelete={onNodeDelete}
						onNodeRename={onNodeRename}
						onNodeSelect={onNodeSelect}
					/>
				)
			}
			{newNode.visible
				&&
				<div className='pseudo-entry'>
					{newNode.isFolder ? <FolderIcon /> : <InsertDriveFileIcon />}
					<div className='entry-name'>
						<input
							type ="text"
							className='entry-input'
							onBlur={handleCancelAdd}
							value={newNode.name}
							onChange={handleInputChange}
							onKeyUp={handleAddEntry}
							autoFocus
						/>
					</div>
				</div>
			}
		</div>
	</>
}
