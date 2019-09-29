import { Workbook, Worksheet, CellValue, Row, Cell, FillPattern } from "exceljs";
import { ParseBase } from "./parse_base";
import { ParseInfo } from "./parse_info";
import { ParseTableInfo, ParseTableItem } from "./parse_table";
import { shell } from "electron";

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

            sheel.eachRow((row: Row, rowNumber: any) => {
                row.eachCell((cell: Cell, cellNumber: any) => {
                    let parseTableItem = new ParseTableItem;
                    if (cell.style.fill && cell.style.fill.type === "pattern") {
                        let fillPattern = <FillPattern>cell.style.fill;
                        if (fillPattern) {
                            parseTableItem.BgColor = fillPattern.fgColor.argb;
                        }
                    }

                    if (cell.style && cell.style.font) {
                        parseTableItem.FontColor = cell.style.font.color.argb;
                    }

                    if (cell.value) {

                    }

                    console.log('Cell ' + cellNumber + ' = ', cell.value, rowNumber);
                });
            });
        }

        return parseTable;
    }
}