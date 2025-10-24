import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const getLnkProps = require('get-windows-shortcut-properties'); // CommonJS

class LnkService {
    // TODO : Add model
     resolveLnk(path: string) {
        return getLnkProps.sync(path)[0];
    }

    getLnkTarget(path: string): string | null {
        return this.resolveLnk(path).TargetPath;
    }
}

export const lnkService = new LnkService();