import FileExplorer from "./components/FileExplorer/FileExplorer";
import "./App.css";

const initialTree = {
    id: "0",
    name: "Folder1",
    isFolder: true,
    isOpen: true,
    children: [{ id: "1", name: "file1.txt", isFolder: false}, { id: "2", name: "file2.jpeg", isFolder: false}]
}

function App() {
    return <div className="App">
        <FileExplorer initialTree={initialTree}/>
    </div>
}

export default App;