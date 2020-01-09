import { WriterBase } from "./writer_base";
import { ParseTableInfo, ParseTableItem, ParseTableStringType } from "../parse/parse_table";
import { TemplateSign } from "../template/template_mgr";
import fs from "fs";

export enum WriterTemplateTypeItem_TS {
    Int32 = "number",
    Float = "number",
    Double = "number",
    Int64 = "number",
    Boolean = "boolean",
    String = "string",
    Array = "[]",
    Array2 = "[][]",
}

export class WriterTemplateTs extends WriterBase {
    protected writeFiles(tempData: string): boolean {
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
            for (let key in g) {
                let templateTemp = tempData.concat();
                templateTemp = templateTemp.replace(TemplateSign.className, key);

                // 生成实际数据 并且处理是否分离
                for (let kk in g[key]) {
                    for (let kkk in g[key][kk]) {
                    }
                }

                if (this.isSeparate()) {

                } else {

                }
                
                // 建立数据结构
                let attributeString = "";
                for (let kk in g[key]) {
                    for (let kkk in g[key][kk]) {
                        attributeString += "    ";
                        attributeString += kkk;
                        attributeString += ";\n";
                    }
                    break;
                }
                templateTemp = templateTemp.replace(TemplateSign.attributeList, attributeString);

                let functionString = "";
                templateTemp = templateTemp.replace(TemplateSign.function, functionString);

                fs.writeFileSync("D:\\code\\Monitor\\tt\\" + key + ".ts", templateTemp, {
                    encoding: "utf-8",
                    flag: "w"
                });
            }
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

            let value: any = null;
            switch (type.Value) {
                case ParseTableStringType.int:
                    r[name.Value + ": " + WriterTemplateTypeItem_TS.Int32] = this.convertNumber(row.Value);
                    break;
                case ParseTableStringType.string:
                    r[name.Value + ": " + WriterTemplateTypeItem_TS.String] = this.convertString(row.Value);
                    break;
                case ParseTableStringType.float:
                    r[name.Value + ": " + WriterTemplateTypeItem_TS.Float] = this.convertfloat(row.Value);
                    break;
                case ParseTableStringType.boolean:
                    r[name.Value + ": " + WriterTemplateTypeItem_TS.Boolean] = this.convertBool(row.Value);
                    break;
                case ParseTableStringType.arrayInt:
                    r[name.Value + ": "
                        + WriterTemplateTypeItem_TS.Int32
                        + WriterTemplateTypeItem_TS.Array] = this.convertArrayNumber(row.Value);
                    break;
                case ParseTableStringType.arrayfloat:
                    r[name.Value + ": "
                        + WriterTemplateTypeItem_TS.Float
                        + WriterTemplateTypeItem_TS.Array] = this.convertArrayFloat(row.Value);
                    break;
                case ParseTableStringType.arrayString:
                    r[name.Value + ": "
                        + WriterTemplateTypeItem_TS.String
                        + WriterTemplateTypeItem_TS.Array] = this.convertArrayString(row.Value);
                    break;
                case ParseTableStringType.array2Int:
                    r[name.Value + ": "
                        + WriterTemplateTypeItem_TS.Int32
                        + WriterTemplateTypeItem_TS.Array2] = this.convertArray2Number(row.Value);
                    break;
                case ParseTableStringType.array2float:
                    r[name.Value + ": "
                        + WriterTemplateTypeItem_TS.Float
                        + WriterTemplateTypeItem_TS.Array2] = this.convertArray2Float(row.Value);
                    break;
                case ParseTableStringType.array2String:
                    r[name.Value + ": "
                        + WriterTemplateTypeItem_TS.String
                        + WriterTemplateTypeItem_TS.Array2] = this.convertArray2String(row.Value);
                    break;
                case ParseTableStringType.Dir:
                    r[name.Value + ":" + "{[index: string]: string}"] = this.convertDir(row.Value);
                    break;
            }
        }
        return r;
    }
}