import { ParseTableInfo } from "./parse_table";

export class ParseInfo {
    private tables: { [index: string]: ParseTableInfo } = {};

    public addTable(table: ParseTableInfo) {
        if (!table) {
            return;
        }
        this.tables[table.Name] = table;
    }

    public getTables(): { [index: string]: ParseTableInfo } {
        return this.tables;
    }
}