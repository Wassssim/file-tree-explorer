export const initialTree = {
    id: "0",
    name: "/",
    isFolder: true,
    isOpen: true,
    children: [
        { 
            id: "0_1", 
            name: "node_modules", 
            isFolder: true,
            children: [
                {
                    id: "0_1_1",
                    name: "@mui",
                    isFolder: true
                }
            ]
        },
        {
            id: "0_2",
            name: "src",
            isFolder: true,
            children: [
                { 
                    id: "0_2_0",
                    name: "Components",
                    isFolder: true,
                    children: [
                        {
                            id: "0_2_0_0",
                            name: "FileExplorer.tsx",
                            isFolder: false
                        },
                        {
                            id: "0_2_0_1",
                            name: "FileExplorer.css",
                            isFolder: false
                        }
                    ]},
                { id: "0_2_1", name: "App.tsx", isFolder: false},
                { id: "0_2_3", name: "App.css", isFolder: false}
            ]
        },
        { id: "0_3", name: "index.html", isFolder: false},
        { id: "0_4", name: "package.json", isFolder: false},
        { id: "0_5", name: "package-lock.json", isFolder: false},
        { id: "0_6", name: "tsconfig.json", isFolder: false},
        { id: "0_7", name: "tsconfig.node.json", isFolder: false},
        { id: "0_8", name: "vite.config.ts", isFolder: false},
    ]
}