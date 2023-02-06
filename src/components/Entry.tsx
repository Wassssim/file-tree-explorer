import { useState, useRef, useEffect } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import { ITreeNode } from '../types/fileExplorerData';
import './Entry.css';

interface EntryProps {
    node: ITreeNode,
    depth: number,
    onNodeClick: (node: ITreeNode) => void
}

interface IInputProps {

}

export default function Entry({node, depth, onNodeClick}: EntryProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
		const [inputProps, setInputProps] = useState({
			visible: false,
			isFolder: false,
			value: ""
		});
		const inputRef = useRef<any>(null);

    const handleEntryClick = (e: any) => {
      setIsOpen(!isOpen);
      onNodeClick(node);
    }
    
    const handleNewEntry = (e: any, isFolder: boolean) => {
			e.stopPropagation();
			setInputProps({ 
				value: "", 
				isFolder,
				visible: true
			});
			if (!isOpen)
				setIsOpen(true);
    }

		const handleCancelAdd = (e: any) => {
			e.stopPropagation();
			setInputProps({ ...inputProps, visible: false});
		}

		const handleInputChange = (e: any) => {
			setInputProps({ ...inputProps, value: e.target.value});
		}

		useEffect(() => {
			if (inputProps.visible)
				inputRef.current.focus();
		}, [inputProps.visible]);

    return <>
      <div 
        onClick={handleEntryClick}
        className="entry"
      >
        <div className='entry-name'>
					{node.type === "Folder" ? <FolderIcon/> : <InsertDriveFileIcon/>} {node.name}
				</div>
        {
					node.type === "Folder" 
					&&
					<div className='entry-add-buttons'>
							<span className='icon-button' onClick={(e) => handleNewEntry(e, false)}><NoteAddOutlinedIcon/></span>
							<span><CreateNewFolderOutlinedIcon  onClick={(e) => handleNewEntry(e, true)}/></span>
					</div>
				}
      </div>
      <div style={{paddingLeft: `${(depth + 1)*10}px`, borderLeft: "1px solid white", display: "flex", flexDirection: "column", alignContent: "flex-start"}}>
        {isOpen
          && node.children?.map((childNode: ITreeNode) => <Entry key={childNode.id} node={childNode} depth={depth+1} onNodeClick={onNodeClick} />)
        }
				{inputProps.visible 
					&& 
					<div className='pseudo-entry'>
						{inputProps.isFolder ? <FolderIcon/> : <InsertDriveFileIcon/>}
						<input 
							className='entry-input'
							onBlur={handleCancelAdd}
							value={inputProps.value}
							onChange={handleInputChange}
							ref={inputRef}
						/>
					</div>
				}
      </div>
    </>
  }
  