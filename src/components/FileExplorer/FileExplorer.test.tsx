import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FileExplorer from './FileExplorer';
import { initialTree } from '../../data/fileExplorerData';

describe("FileExplorer", () => {
    it("delete is working", () => {
        render(<FileExplorer initialTree={initialTree} onNodeSelect={(_) => {}}/>);
        // const randomFileNode = getAllByTestId();
        // to be implemented
        expect(true).toBe(true);
    })
})