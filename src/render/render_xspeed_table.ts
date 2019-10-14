import { ParseInfo } from "../parse/parse_info";
import { ParseTableItem } from "../parse/parse_table";
import { ParseTableInfo } from "../parse/parse_table";
import { RenderBase } from "./render_base";
import { ParseXlsx } from "../parse/parse_xlsx";

export class RenderXSpeedTable extends RenderBase {

    public static tranforTypeToChina = {
        "i": "整数",
        "ai": "整数一维数组",
        "aii": "整数二维数组",
        "f": "浮点数",
        "af": "浮点数一维数组",
        "aff": "浮点数二维数组",
        "b": "布尔值",
        "s": "字符串",
        "as": "字符串一维数组",
        "ass": "字符串二维数组",
        "d": "字典键值对",
    }

    public render(info: ParseInfo): any {
        let r: { [index: string]: any } = {};
        let tables = info.getTables();
        for (let key in info.getTables()) {
            let table = tables[key];
            if (!table) {
                continue;
            }

            r[table.Name] = this.renderTable(table);
        }

        return r;
    }

    public renderTableList(info: ParseInfo): string[] {
        let r: string[] = [];
        let tables = info.getTables();
        for (let key in info.getTables()) {
            let table = tables[key];
            if (!table) {
                continue;
            }

            r.push(table.Name);
        }

        return r;
    }

    public renderItem(item: ParseTableItem): any {
        let r = {
            text: item ? item.Value : ""
        };
        return r;
    }

    public renderTopItem(item: ParseTableItem): any {
        let value = item ? item.Value : "";
        if (value === "__type__") {
            value = "类型";
        } else if (value === "__name__") {
            value = "程序用名";
        } else if (value === "__default__") {
            value = "缺省值";
        } else if (value === "__desc__") {
            value = "值描述";
        }

        let r = {
            text: value
        };
        return r;
    }

    public renderTopTypeItem(item: any) {
        let value = item ? item.text : "";

        if (RenderXSpeedTable.tranforTypeToChina[value]) {
            value = RenderXSpeedTable.tranforTypeToChina[value];
        }

        let r = {
            text: value
        };

        return r;
    }

    public renderTable(table: ParseTableInfo): any {
        let datas = this.createTableDatas(table);
        return { datas: datas };
    }

    private createTableDatas(table: ParseTableInfo) {
        let sendData = [];
        let types = table.getTypes();
        let names = table.getNames();
        let descs = table.getDescs();
        let defaults = table.getDefaults();

        sendData.push({ cells: this.createTableTopInfo(types, defaults) });
        sendData.push({ cells: this.createTableTopInfo(types, types, true) });
        sendData.push({ cells: this.createTableTopInfo(types, descs) });
        sendData.push({ cells: this.createTableTopInfo(types, names) });

        for (let i = ParseTableInfo.TrusRowIndex; i <= table.getCount(); i++) {
            let sendObject: any[] = [];
            let datas = table.getDatas(i);
            if (!datas) {
                continue;
            }

            for (let i = 0; i < types.length; i++) {
                let type = types[i];
                if (type.Value === ParseXlsx.ExplanatoryNote) {
                    continue;
                }

                sendObject.push(this.renderItem(datas[i]));
            }

            sendData.push({ cells: sendObject });
        }

        return sendData;
    }

    private createTableTopInfo(types: ParseTableItem[], datas: ParseTableItem[], isType: boolean = false) {
        let sendTopObject = [];
        for (let i = 0; i < types.length; i++) {
            let data = datas[i];
            let type = types[i];
            if (type.Value === ParseXlsx.ExplanatoryNote) {
                continue;
            }

            if (isType) {
                sendTopObject.push(this.renderTopTypeItem(this.renderTopItem(data)));
            } else {
                sendTopObject.push(this.renderTopItem(data));
            }
        }

        return sendTopObject;
    }
}