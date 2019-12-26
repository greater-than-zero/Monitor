import { Workbook, Worksheet, CellValue, Row, Cell, FillPattern, ValueType, CellFormulaValue, Column } from "exceljs";
import { ParseBase } from "./parse_base";
import { ParseInfo } from "./parse_info";
import { ParseTableInfo, ParseTableItem } from "./parse_table";

export class ParseXlsx extends ParseBase {
    public static ExplanatoryNote: string = "#";
    private xlsx: Workbook;

    public parseToFile(path: string, callback: (data: ParseInfo) => void) {
        let parseInfo = new ParseInfo();
        this.xlsx = new Workbook();
        this.xlsx.xlsx.readFile(path).then(() => {
            for (let table of this.xlsx.worksheets) {
                parseInfo.addTable(this.parseTable(table.name));
            }
            callback(parseInfo);
        });
    }

    public parseToData(data: Buffer, callback: (data: ParseInfo) => void) {
        let parseInfo = new ParseInfo();
        this.xlsx = new Workbook();
        this.xlsx.xlsx.load(data).then(() => {
            for (let table of this.xlsx.worksheets) {
                parseInfo.addTable(this.parseTable(table.name));
            }
            callback(parseInfo);
        });
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

            sheel.eachRow((row: Row, rowNumber: number) => {
                row.eachCell((cell: Cell, cellNumber: number) => {
                    parseTable.addRow(rowNumber, this.parseTableItem(cell, cellNumber));
                });
            });
        }

        return parseTable;
    }

    public parseTableItem(cell: Cell, cellNumber: number): ParseTableItem {
        if (!this.xlsx) {
            return;
        }

        let parseTableItem = new ParseTableItem;
        if (cell.style.fill && cell.style.fill.type === "pattern") {
            let fillPattern = <FillPattern>cell.style.fill;
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

    public parseTableValue(item: ParseTableItem, cell: Cell) {
        if (cell.type === ValueType.Formula) {
            let formula = <CellFormulaValue>cell.value;
            item.Formula = formula.formula;
            item.Value = formula.result.toString();
        } else {
            item.Value = cell.text;
        }
    }
}