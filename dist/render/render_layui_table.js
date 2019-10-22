"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_table_1 = require("../parse/parse_table");
const render_base_1 = require("./render_base");
const parse_xlsx_1 = require("../parse/parse_xlsx");
class RenderLayuiTable extends render_base_1.RenderBase {
    render(info) {
        let r = {};
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
    renderTableList(info) {
        let r = [];
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
    renderItem(item) {
        return item.Value;
    }
    renderTable(table) {
        let cols = this.createTableCols(table);
        let datas = this.createTableDatas(table);
        return { cols: cols, datas: datas };
    }
    createTableCols(table) {
        let descs = table.getDescs();
        let types = table.getTypes();
        let names = table.getNames();
        let cols = [];
        for (let i = 0; i < types.length; i++) {
            let type = types[i];
            let desc = descs[i];
            let name = names[i];
            if (type.Value === parse_xlsx_1.ParseXlsx.ExplanatoryNote) {
                continue;
            }
            let col = {};
            if (i === 0) {
                col = this.createIdCol(name.Value, "", 80, true, "left", 300);
            }
            else {
                col = this.createNormaltCol(name.Value, desc.Value, "", 80, true, "", 300);
            }
            cols.push(col);
        }
        return cols;
    }
    createTableDatas(table) {
        let sendData = [];
        let types = table.getTypes();
        let names = table.getNames();
        for (let i = parse_table_1.ParseTableInfo.TrusRowIndex; i < table.getTrueCount(); i++) {
            let sendObject = {};
            let datas = table.getDatas(i);
            if (!datas) {
                continue;
            }
            for (let i = 0; i < types.length; i++) {
                let type = types[i];
                let name = names[i];
                if (type.Value === parse_xlsx_1.ParseXlsx.ExplanatoryNote) {
                    continue;
                }
                sendObject[name.Value] = this.renderItem(datas[i]);
            }
            sendData.push(sendObject);
        }
        return sendData;
    }
    createIdCol(value, style = "", width, sort, fixed, minWidth) {
        return { field: value, title: "id", width: width, sort: sort, fixed: fixed, minWidth: minWidth, style: style };
    }
    createNormaltCol(value, title, style = "", width, sort, fixed, minWidth) {
        return { field: value, title: title, width: width, sort: sort, fixed: fixed, minWidth: minWidth, style: style };
    }
}
exports.RenderLayuiTable = RenderLayuiTable;
//# sourceMappingURL=render_layui_table.js.map