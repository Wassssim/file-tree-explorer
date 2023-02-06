import { useState, useRef, useEffect, KeyboardEvent  } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import { v4 as uuidv4 } from 'uuid';
import { ITreeNode } from '../types/fileExplorerData';
import './Entry.css';

interface EntryProps {
	node: ITreeNode,
	depth: number,
	onNodeAdd: (folderId: string, node: ITreeNode) => void
}

export default function Entry({ node, depth, onNodeAdd }: EntryProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [newNode, setNewNode] = useState<ITreeNode>({
		id: "-1",
		visible: false,
		isFolder: false,
		name: ""
	});
	const inputRef = useRef<any>(null);

	const handleEntryClick = (e: any) => {
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

	const handleAddEntry = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onNodeAdd(node.id, {...newNode, id: uuidv4()});
			setNewNode({...node, visible: false, name: ""});
		}
	}

	const handleCancelAdd = (e: any) => {
		e.stopPropagation();
		setNewNode({ ...newNode, visible: false });
	}

	const handleInputChange = (e: any) => {
		setNewNode({ ...newNode, name: e.target.value });
	}

	useEffect(() => {
		if (newNode.visible)
			inputRef.current.focus();
	}, [newNode.visible]);

	return <>
		<div
			onClick={handleEntryClick}
			className="entry"
		>
			<div className='entry-name'>
				{node.isFolder ? <FolderIcon /> : <InsertDriveFileIcon />} {node.name}
			</div>
			{
				node.isFolder
				&&
				<div className='entry-add-buttons'>
					<span className='icon-button' onClick={(e) => handleNewEntry(e, false)}><NoteAddOutlinedIcon /></span>
					<span><CreateNewFolderOutlinedIcon onClick={(e) => handleNewEntry(e, true)} /></span>
				</div>
			}
		</div>
		<div style={{ paddingLeft: `${(depth + 1) * 10}px`, borderLeft: "1px solid var(--secondary-bg-color)", display: "flex", flexDirection: "column", alignContent: "flex-start" }}>
			{isOpen
				&& node.children?.map((childNode: ITreeNode) => <Entry key={childNode.id} node={childNode} depth={depth + 1} onNodeAdd={onNodeAdd} />)
			}
			{newNode.visible
				&&
				<div className='pseudo-entry'>
					{newNode.isFolder ? <FolderIcon /> : <InsertDriveFileIcon />}
					<input
						className='entry-input'
						onBlur={handleCancelAdd}
						value={newNode.name}
						onChange={handleInputChange}
						onKeyUp={handleAddEntry}
						ref={inputRef}
					/>
				</div>
			}
		</div>
	</>
}
