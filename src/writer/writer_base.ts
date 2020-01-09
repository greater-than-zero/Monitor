import { ParseInfo } from "../parse/parse_info";

export class WriterBase {
    protected xlsx: ParseInfo;
    private _isSeparate: boolean; //是否分离数据代码

    public write(xlsx: ParseInfo) {
        this.xlsx = xlsx;
        this.generateJson();
        this.writeFiles();
    }

    protected generateJson(): boolean {
        return false;
    }

    protected writeFiles(): boolean {
        return false;
    }

    protected convertNumber(val: string): number {
        return Number(val);
    }

    protected convertfloat(val: string): number {
        return Number(val);
    }

    protected convertBool(val: string): boolean {
        return Boolean(val);
    }

    protected convertString(val: string): string {
        return val + "";
    }

    protected convertArrayNumber(val: string): number[] {
        let ar = val.split("|");
        let r: number[] = [];
        if (ar.length > 0) {
            for (let item of ar) {
                r.push(Number(item));
            }
        }

        return r;
    }

    protected convertArrayFloat(val: string): number[] {
        return this.convertArrayNumber(val);
    }

    protected convertArrayString(val: string): string[] {
        let ar = val.split("|");
        let r: string[] = [];
        if (ar.length > 0) {
            for (let item of ar) {
                r.push(item);
            }
        }

        return r;
    }

    protected convertArray2Number(val: string): number[][] {
        let aar = val.split(";");
        let r: number[][] = [];
        if (aar.length > 0) {
            let pValue: number[] = [];
            for (let item of aar) {
                let ar = item.split("|");
                if (ar.length > 0) {
                    for (let arItem of ar) {
                        pValue.push(Number(arItem));
                    }
                }
            }
            r.push(pValue);
        }

        return r;
    }

    protected convertArray2Float(val: string): number[][] {
        return this.convertArray2Number(val);
    }

    protected convertArray2String(val: string): string[][] {
        let aar = val.split(";");
        let r: string[][] = [];
        if (aar.length > 0) {
            let pValue: string[] = [];
            for (let item of aar) {
                let ar = item.split("|");
                if (ar.length > 0) {
                    for (let arItem of ar) {
                        pValue.push(arItem);
                    }
                }
            }
            r.push(pValue);
        }

        return r;
    }

    protected convertDir(val: string): { [index: string]: string } {
        let r: { [index: string]: string } = {};
        let ds = val.split(";");
        if (ds.length > 0) {
            for (let dItem of ds) {
                let dValue = dItem.split("|");
                if (dValue.length === 2) {
                    let key = dValue[0];
                    let value = dValue[1];
                    r[key] = value;
                }
            }
        }

        return r;
    }

    public isSeparate(): boolean {
        return this._isSeparate;
    }
}