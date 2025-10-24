import { useState } from "react";
import { fileService } from "../file/file.service";
import type { IsoMetadata } from "~/models";

class IsoService {
    public isoList: string[] = [];
    public isoWithEmulatorList: Partial<IsoMetadata>[] = [];
    public filteredIsoList: string[] = [];

    constructor() {
        this.fetchIsoList();
    }

    fetchIsoList() {
        this.isoList = [];
        this.isoWithEmulatorList = [];
        this.filteredIsoList = [];

        const folder = import.meta.env.VITE_RETROARCHISOFOLDER;
        const filelist = fileService.readFolderWithChildren(folder);
        this.isoList = filelist;
        this.filteredIsoList = filelist;

        this.isoList.forEach((file) => {
            const isoMetadata = this.identifyIso(file);
            isoMetadata && this.isoWithEmulatorList.push({...isoMetadata, fullPath: file[0] ==='C' ? file : folder + file});
        });

        console.log("ISO List:", this.isoWithEmulatorList);
    }

    identifyIso(fileName: string): Partial<IsoMetadata> | undefined {
        const extention = fileName.split('.').pop()?.toLowerCase();

        switch (extention) {
            case 'nds':
                return { title: fileName, emulator: 'desmume' };
            case 'gba':
                return { title: fileName, emulator: 'mgba' };
            case 'gbc':
                return { title: fileName, emulator: 'gambatte' };
            case 'gb':
                return { title: fileName, emulator: 'gambatte' };
            case 'sfc':
                return { title: fileName, emulator: 'snes9x' };
            case 'smc':
                return { title: fileName, emulator: 'snes9x' };
            case 'nes':
                return { title: fileName, emulator: '' };
            case 'iso':
                console.log("Identifying ISO:", fileName);
                return this.identifyIsoByIsoHeader(fileName);
            case 'cue':
                return { title: fileName, emulator: 'pcsx_rearmed' };
            case 'bin':
                break;
            default:
                return { title: fileName, emulator: '' };
        }

    }

    identifyIsoByIsoHeader(fileName: string): Partial<IsoMetadata> {
        const pspMagic = "PSP GAME";

        // FIXME : Temporary fix for full path issue
        const filePath = fileName[0] ==='C' ? fileName : process.env.VITE_RETROARCHISOFOLDER + fileName;
        
            process.env.VITE_RETROARCHISOFOLDER + fileName, 0x8000, 16
        const gameString = fileService.readFileString(filePath, 0x8000, 16);

        // Simple PSP ISO check: look for "PSP GAME" string at offset 0x8000
        console.log("Game String:", gameString);
        if (gameString.includes(pspMagic)) {
            return { title: fileName, emulator: "ppsspp" };
        }

        return { title: fileName, emulator: '' };
    }
}

export const isoService = new IsoService();