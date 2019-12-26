import { WriterBase } from "./writer_base";
import { ParseInfo } from "../parse/parse_info";
import { ParseTableItem, ParseTableInfo, ParseTableStringType } from "../parse/parse_table";

export class WriterJson extends WriterBase {

    protected generateJson(): boolean {
        let r: boolean = false;
        if (!this.xlsx) {
            return r;
        }

        let g: { [index: string]: any } = {};
        let tableMap = this.xlsx.getTables();
        for (let key in tableMap) {
            let table = tableMap[key];
            if (!table) {
                continue;
            }

            let itemList: { [index: string]: any } = {};
            for (let index = table.getTrueCount(); index < table.getCount(); index++) {
                let tableRows = table.getDatas(index);
                if (!tableRows) {
                    continue;
                }

                let idItem = tableRows[0];
                if (!idItem) {
                    continue;
                }

                itemList[idItem.Value + ""] = this.generateCode(table, tableRows);
            }

            g[table.Name] = itemList;
        }

        if (Object.keys(g).length > 0) {
            // todo write
            r = true;
        }

        console.debug(g);

        return r;
    }

    private generateCode(table: ParseTableInfo, tableRows: ParseTableItem[]): any {
        let types = table.getTypes();
        let names = table.getNames();

        if (!types || !tableRows || !names) {
            return;
        }

        let r: { [index: string]: any } = {};
        for (let index = 0; index < tableRows.length; index++) {
            let type = types[index];
            let name = names[index];
            let row = tableRows[index];
            if (!type || !name) {
                continue;
            }

            switch (type.Value) {
                case ParseTableStringType.int:
                    r[name.Value + ""] = this.convertNumber(row.Value);
                    break;
                case ParseTableStringType.string:
                    r[name.Value + ""] = this.convertString(row.Value);
                    break;
                case ParseTableStringType.float:
                    r[name.Value + ""] = this.convertfloat(row.Value);
                    break;
                case ParseTableStringType.boolean:
                    r[name.Value + ""] = this.convertBool(row.Value);
                    break;
                case ParseTableStringType.arrayInt:
                    r[name.Value + ""] = this.convertArrayNumber(row.Value);
                    break;
                case ParseTableStringType.arrayfloat:
                    r[name.Value + ""] = this.convertArrayFloat(row.Value);
                    break;
                case ParseTableStringType.arrayString:
                    r[name.Value + ""] = this.convertArrayString(row.Value);
                    break;
                case ParseTableStringType.array2Int:
                    r[name.Value + ""] = this.convertArray2Number(row.Value);
                    break;
                case ParseTableStringType.array2float:
                    r[name.Value + ""] = this.convertArray2Float(row.Value);
                    break;
                case ParseTableStringType.array2String:
                    r[name.Value + ""] = this.convertArray2String(row.Value);
                    break;
                case ParseTableStringType.Dir:
                    r[name.Value + ""] = this.convertDir(row.Value);
                    break;
            }
        }

        return r;
    }
}