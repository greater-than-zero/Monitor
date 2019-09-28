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
                this.parseTable(table.name);
            }
        });
        return parseInfo;
    }
    parseToData(data) {
        let parseInfo = new parse_info_1.ParseInfo();
        this.xlsx = new exceljs_1.Workbook();
        this.xlsx.xlsx.read(data).then(() => {
            for (let table of this.xlsx.worksheets) {
                this.parseTable(table.name);
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
            // for (let row = 0; row < sheel.rowCount; row++) {
            //     let values: CellValue[] | { [key: string]: CellValue } = sheel.getRow(row + 1).values;
            //     for (let key in values) {
            //         let rowData: CellValue = values[key];
            //     }
            //     // console.log(, "row");
            // }
            sheel.eachRow((row, rowNumber) => {
                row.eachCell((cell, cellNumber) => {
                    if (cell.value) {
                    }
                    console.log('Cell ' + cellNumber + ' = ', cell.value, rowNumber);
                });
            });
        }
        return parseTable;
    }
}
exports.ParseXlsx = ParseXlsx;
//# sourceMappingURL=parse_xlsx.js.map