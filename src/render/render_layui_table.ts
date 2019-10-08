import { ParseInfo } from "../parse/parse_info";
import { ParseTableItem } from "../parse/parse_table";
import { ParseTableInfo } from "../parse/parse_table";
import { RenderBase } from "./render_base";
import { ParseXlsx } from "../parse/parse_xlsx";

export class RenderLayuiTable extends RenderBase {
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
        return item.Value;
    }

    public renderTable(table: ParseTableInfo): any {
        let cols = this.createTableCols(table);
        let datas = this.createTableDatas(table);
        return { cols: cols, datas: datas };
    }

    private createTableCols(table: ParseTableInfo) {
        let descs = table.getDescs();
        let types = table.getTypes();
        let names = table.getNames();

        let cols = [];
        for (let i = 0; i < types.length; i++) {
            let type = types[i];
            let desc = descs[i];
            let name = names[i];
            if (type.Value === ParseXlsx.ExplanatoryNote) {
                continue;
            }

            let col = {};
            if (i === 0) {
                col = this.createIdCol(name.Value, "", 80, true, "left", 300);
            } else {
                col = this.createNormaltCol(name.Value, desc.Value, "", 80, true, "", 300);
            }

            cols.push(col);
        }

        return cols;
    }

    private createTableDatas(table: ParseTableInfo) {
        let sendData = [];
        let types = table.getTypes();
        let names = table.getNames();

        for (let i = ParseTableInfo.TrusRowIndex; i < table.getTrueCount(); i++) {
            let sendObject: { [index: string]: string } = {};
            let datas = table.getDatas(i);
            if (!datas) {
                continue;
            }

            for (let i = 0; i < types.length; i++) {
                let type = types[i];
                let name = names[i];
                if (type.Value === ParseXlsx.ExplanatoryNote) {
                    continue;
                }

                sendObject[name.Value] = this.renderItem(datas[i]);
            }

            sendData.push(sendObject);
        }

        return sendData;
    }

    private createIdCol(value: string,
        style: string = "",
        width: number,
        sort: boolean,
        fixed: string,
        minWidth: number) {
        return { field: value, title: "id", width: width, sort: sort, fixed: fixed, minWidth: minWidth, style: style };
    }

    private createNormaltCol(value: string,
        title: string,
        style: string = "",
        width: number,
        sort: boolean,
        fixed: string,
        minWidth: number) {
        return { field: value, title: title, width: width, sort: sort, fixed: fixed, minWidth: minWidth, style: style };
    }
}