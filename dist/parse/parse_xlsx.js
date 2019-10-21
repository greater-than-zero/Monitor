"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceljs_1 = require("exceljs");
const parse_base_1 = require("./parse_base");
const parse_info_1 = require("./parse_info");
const parse_table_1 = require("./parse_table");
class ParseXlsx extends parse_base_1.ParseBase {
    parseToFile(path) {
        let parseInfo = new parse_info_1.ParseInfo();
        this.xlsx = new exceljs_1.Workbook();
        this.xlsx.xlsx.readFile(path).then(() => {
            for (let table of this.xlsx.worksheets) {
                parseInfo.addTable(this.parseTable(table.name));
            }
        });
        return parseInfo;
    }
    parseToData(data) {
        let parseInfo = new parse_info_1.ParseInfo();
        this.xlsx = new exceljs_1.Workbook();
        this.xlsx.xlsx.read(data).then(() => {
            for (let table of this.xlsx.worksheets) {
                parseInfo.addTable(this.parseTable(table.name));
            }
        });
        return parseInfo;
    }
    parseTable(tableName) {
        if (!this.xlsx) {
            return;
        }
        let parseTable = null;
        let sheel = this.xlsx.getWorksheet(tableName);
        if (sheel) {
            parseTable = new parse_table_1.ParseTableInfo();
            parseTable.Name = tableName;
            sheel.eachRow((row, rowNumber) => {
                row.eachCell((cell, cellNumber) => {
                    parseTable.addRow(rowNumber, this.parseTableItem(cell, cellNumber));
                });
            });
        }
        return parseTable;
    }
    parseTableItem(cell, cellNumber) {
        if (!this.xlsx) {
            return;
        }
        let parseTableItem = new parse_table_1.ParseTableItem;
        if (cell.style.fill && cell.style.fill.type === "pattern") {
            let fillPattern = cell.style.fill;
            if (fillPattern) {
                if (fillPattern.fgColor) {
                    parseTableItem.BgColor = fillPattern.fgColor.argb;
                }
            }
        }
        if (cell.style && cell.style.font) {
            if (cell.style.font.color) {
                parseTableItem.FontColor = cell.style.font.color.argb;
            }
        }
        parseTableItem.Address = cell.address;
        this.parseTableValue(parseTableItem, cell);
        return parseTableItem;
    }
    parseTableValue(item, cell) {
        if (cell.type === 6 /* Formula */) {
            let formula = cell.value;
            item.Formula = formula.formula;
            item.Value = formula.result.toString();
        }
        else {
            item.Value = cell.text;
        }
    }
}
exports.ParseXlsx = ParseXlsx;
ParseXlsx.ExplanatoryNote = "#";
//# sourceMappingURL=parse_xlsx.js.map