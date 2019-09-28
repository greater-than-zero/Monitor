import { Workbook, Worksheet, CellValue } from "exceljs";
import { ParseBase } from "./parse_base";
import { ParseInfo } from "./parse_info";
import { ParseTableInfo } from "./parse_table";

export class ParseXlsx extends ParseBase {
    private xlsx: Workbook;

    public parseToFile(path: string): ParseInfo {
        let parseInfo = new ParseInfo();
        this.xlsx = new Workbook();
        this.xlsx.xlsx.readFile(path).then(() => {
            for (let table of this.xlsx.worksheets) {
                this.parseTable(table.name);
            }
        });

        return parseInfo;
    }

    public parseToData(data: any) {
        let parseInfo = new ParseInfo();
        this.xlsx = new Workbook();
        this.xlsx.xlsx.read(data).then(() => {
            for (let table of this.xlsx.worksheets) {
                this.parseTable(table.name);
            }
        });
        return parseInfo;
    }

    public parseTable(tableName: string): ParseTableInfo {
        if (!this.xlsx) {
            return;
        }

        let parseTable: ParseTableInfo = null;
        let sheel: Worksheet = this.xlsx.getWorksheet(tableName);
        if (sheel) {
            parseTable = new ParseTableInfo();
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