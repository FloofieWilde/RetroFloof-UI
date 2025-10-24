import fs from "fs";

class FileService {
    readFolder(path?: string): string[] {
        if (!path) return [];
        const files = fs.readdirSync(path);
        return files;
    }

    readFolderWithChildren(path?: string): { name: string; isDirectory: boolean }[] {
        if (!path) return [];
        const dirents = fs.readdirSync(path, { withFileTypes: true });
        return dirents.map((dirent) => ({
            name: dirent.name,
            isDirectory: dirent.isDirectory(),
        }));
    }

    readFileBuffer(filePath: string, start: number, length: number): Buffer {
        const fd = fs.openSync(filePath, 'r');
        const buffer = Buffer.alloc(length);
        fs.readSync(fd, buffer, 0, length, start);
        fs.closeSync(fd);
        return buffer;
    }

    readFileString(filePath: string, start: number, length: number): string {
        const buffer = this.readFileBuffer(filePath, start, length);
        return buffer.toString('utf-8').replace(/\0/g, ''); // Remove null characters
    }
}

export const fileService = new FileService();