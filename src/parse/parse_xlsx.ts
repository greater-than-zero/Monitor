import { Workbook, Worksheet, CellValue, Row, Cell, FillPattern, ValueType, CellFormulaValue, Column } from "exceljs";
import { ParseBase } from "./parse_base";
import { ParseInfo } from "./parse_info";
import { ParseTableInfo, ParseTableItem } from "./parse_table";

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
                parseInfo.addTable(this.parseTable(table.name));
            }
        });
        console.log("parseToData", parseInfo);
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

            sheel.eachColumnKey((column: Column, index: number) => {
                // console.log("Column", columns);
            })

            console.log("Column", sheel.columns);

            sheel.eachRow((row: Row, rowNumber: number) => {
                row.eachCell((cell: Cell, cellNumber: number) => {
                    console.log('Cell ' + cellNumber + ' = ', cell.value, rowNumber, this.parseTableItem(cell, cellNumber));
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
                parseTableItem.BgColor = fillPattern.fgColor.argb;
            }
        }

        if (cell.style && cell.style.font) {
            parseTableItem.FontColor = cell.style.font.color.argb;
        }

        let x = "A1:B1".match(/(?:(?:(?:'((?:[^']|'')*)')|([^'^ !]*))!)?(.*)/);
        console.log(x);
        this.parseTableValue(parseTableItem, cell);
        return parseTableItem;
    }

    // 太多了暂时只用的上4种
    public parseTableValue(item: ParseTableItem, cell: Cell) {
        if (cell.type === ValueType.Formula) {
            let formula = <CellFormulaValue>cell.value;
            item.Formula = formula.formula;
            item.Value = formula.result.toString();
        } else {
            item.Value = cell.text;
        }
    }

    public decodeAddress(value: string) {
        let matchCol = value.match(/[A-Z]+/);
        let col;
        let colNumber;

        if (matchCol) {
            col = matchCol[0];
            //colNumber = this.l2n(col);
        }

        var matchRow = value.match(/\d+/);
        var row;
        var rowNumber;

        if (matchRow) {
            row = matchRow[0];
            rowNumber = parseInt(row, 10);
        } // in case $row$col


        value = (col || '') + (row || '');
        var address = {
            address: value,
            col: colNumber,
            row: rowNumber,
            $col$row: "$".concat(col || '', "$").concat(row || '')
        }; // mem fix - cache only the tl 100x100 square

        // if (colNumber <= 100 && rowNumber <= 100) {
        //     this._hash[value] = address;
        //     this._hash[address.$col$row] = address;
        // }

        return address;
    }
}