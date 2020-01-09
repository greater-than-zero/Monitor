import { WriterBase } from "./writer_base";
import { ParseTableInfo, ParseTableItem, ParseTableStringType } from "../parse/parse_table";

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
    protected generateJson(): boolean {
        return false;
    }

    protected writeFiles(): boolean {
        return false;
    }

    private generateCode(table: ParseTableInfo, tableRows: ParseTableItem[]): any {
        let types = table.getTypes();
        let names = table.getNames();

        if (!types || !tableRows || !names) {
            return;
        }

        let className = table.Name;

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
                    value = this.isSeparate() ? ";" : this.convertNumber(row.Value);
                    r[name.Value + ": " + WriterTemplateTypeItem_TS.Int32] = value;
                    break;
                case ParseTableStringType.string:
                    value = this.isSeparate() ? ";" : this.convertString(row.Value);
                    r[name.Value + ": " + WriterTemplateTypeItem_TS.String] = value;
                    break;
                case ParseTableStringType.float:
                    value = this.isSeparate() ? ";" : this.convertfloat(row.Value);
                    r[name.Value + ": " + WriterTemplateTypeItem_TS.Float] = value;
                    break;
                case ParseTableStringType.boolean:
                    value = this.isSeparate() ? ";" : this.convertBool(row.Value);
                    r[name.Value + ": " + WriterTemplateTypeItem_TS.Boolean] = value;
                    break;
                case ParseTableStringType.arrayInt:
                    value = this.isSeparate() ? ";" : this.convertArrayNumber(row.Value);
                    r[name.Value + ": "
                        + WriterTemplateTypeItem_TS.Int32
                        + WriterTemplateTypeItem_TS.Array] = value;
                    break;
                case ParseTableStringType.arrayfloat:
                    value = this.isSeparate() ? ";" : this.convertArrayFloat(row.Value);
                    r[name.Value + ": "
                        + WriterTemplateTypeItem_TS.Float
                        + WriterTemplateTypeItem_TS.Array] = value;
                    break;
                case ParseTableStringType.arrayString:
                    value = this.isSeparate() ? ";" : this.convertArrayString(row.Value);
                    r[name.Value + ": "
                        + WriterTemplateTypeItem_TS.String
                        + WriterTemplateTypeItem_TS.Array] = value;
                    break;
                case ParseTableStringType.array2Int:
                    value = this.isSeparate() ? ";" : this.convertArray2Number(row.Value);
                    r[name.Value + ": "
                        + WriterTemplateTypeItem_TS.Int32
                        + WriterTemplateTypeItem_TS.Array2] = value;
                    break;
                case ParseTableStringType.array2float:
                    value = this.isSeparate() ? ";" : this.convertArray2Float(row.Value);
                    r[name.Value + ": "
                        + WriterTemplateTypeItem_TS.Float
                        + WriterTemplateTypeItem_TS.Array2] = value;
                    break;
                case ParseTableStringType.array2String:
                    value = this.isSeparate() ? ";" : this.convertArray2String(row.Value);
                    r[name.Value + ": "
                        + WriterTemplateTypeItem_TS.String
                        + WriterTemplateTypeItem_TS.Array2] = value;
                    break;
                case ParseTableStringType.Dir:
                    value = this.isSeparate() ? ";" : this.convertDir(row.Value);
                    r[name.Value + ":" + "{[index: string]: string}"] = this.convertDir(row.Value);
                    break;
            }
        }
        return r;
    }
}