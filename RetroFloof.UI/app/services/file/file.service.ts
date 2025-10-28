import fs from "fs";
import pathModule from "path";
import { lnkService } from "./lnk.service";

class FileService {
    readFolder(path?: string): string[] {
        if (!path) return [];
        const files = fs.readdirSync(path);
        return files;
    }

    readFolderWithFileTypes(path?: string): fs.Dirent[] {
        if (!path) return [];
        const items = fs.readdirSync(path, { withFileTypes: true });
        return items;
    }

    readFolderWithChildren(path?: string): string[] {
        if (!path) return [];
        const results: string[] = [];
        const items = this.readFolderWithFileTypes(path);

        for (const item of items) {
            if (item?.isDirectory()) {
                // TODO : Handle nested directories
                // TODO : Handle multiple bin files (PSX CD)
                const childPath = pathModule.join(path, item.name);
                const childFiles = this.readFolderWithChildren(childPath);
                results.push(...childFiles.map(f => pathModule.isAbsolute(f) ? f : pathModule.join(item.name, f)));
            } else {
                const ext = pathModule.extname(item.name);
                if (ext === '.lnk') {
                    // TODO : Transition to Electron method if integrated
                    const linkedPath = lnkService.getLnkTarget(pathModule.join(path, item.name));

                    if (linkedPath && fs.existsSync(linkedPath)) {
                        const linkedFiles = this.readFolderWithChildren(linkedPath);
                        const absoluteLinkedPath = linkedFiles.map(f => pathModule.isAbsolute(f) ? f : pathModule.join(linkedPath, f));
                        results.push(...absoluteLinkedPath);
                    }
                } else {
                    results.push(item.name);
                }
            }
        }
        return results;
    }

    readFileBuffer(filePath: string, start: number, length: number): Buffer {
        const fd = fs.openSync(filePath, 'r');
        const buffer = Buffer.alloc(length);
        fs.readSync(fd, buffer, 0, length, start);
        fs.closeSync(fd);
        return buffer;
    }

    readFileString(filePath: string, start: number, length: number): string {
        // TODO : Handle length = 0 (for reading full file)
        const buffer = this.readFileBuffer(filePath, start, length);
        return buffer.toString('utf-8').replace(/\0/g, ''); // Remove null characters
    }

    isFullPath(filePath: string): boolean {
        console.log("Checking if full path:", filePath, pathModule.isAbsolute(filePath));
        return pathModule.isAbsolute(filePath);
    }

    getFullPath(fileName: string): string {
        return this.isFullPath(fileName) ? fileName : process.env.VITE_RETROARCHISOFOLDER + fileName
    }
}

export const fileService = new FileService();