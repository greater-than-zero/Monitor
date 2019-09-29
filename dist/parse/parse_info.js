"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParseInfo {
    constructor() {
        this.tables = {};
    }
    addTable(table) {
        if (!table) {
            return;
        }
        this.tables[table.Name] = table;
    }
}
exports.ParseInfo = ParseInfo;
//# sourceMappingURL=parse_info.js.map