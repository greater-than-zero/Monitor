import { ParseInfo } from "./parse_info";

export class ParseBase {
    public parseToFile(path: string, callback: (data: ParseInfo) => void) {
    }

    public parseToData(data: Buffer, callback: (data: ParseInfo) => void) {
    }
}