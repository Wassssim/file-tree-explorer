import "./FileViewer.css";

interface IFileViewerProps {
    filename: string
}

function FileViewer({ filename }: IFileViewerProps) {
    return <div className="file-viewer">
        <p>{filename}</p>
    </div>
}

export default FileViewer;