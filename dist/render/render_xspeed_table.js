"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_table_1 = require("../parse/parse_table");
const render_base_1 = require("./render_base");
const parse_xlsx_1 = require("../parse/parse_xlsx");
class RenderXSpeedTable extends render_base_1.RenderBase {
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
        let r = {
            text: item ? item.Value : ""
        };
        return r;
    }
    renderTopItem(item, style = -1) {
        let value = item ? item.Value : "";
        if (value === "__type__") {
            value = "类型";
        }
        else if (value === "__name__") {
            value = "程序用名";
        }
        else if (value === "__default__") {
            value = "缺省值";
        }
        else if (value === "__desc__") {
            value = "值描述";
        }
        let r = {
            text: value
        };
        if (style >= 0) {
            r["style"] = style;
        }
        return r;
    }
    renderTopTypeItem(item, style = -1) {
        let value = item ? item.text : "";
        if (RenderXSpeedTable.tranforTypeToChina[value]) {
            value = RenderXSpeedTable.tranforTypeToChina[value];
        }
        let r = {
            text: value
        };
        if (style >= 0) {
            r["style"] = style;
        }
        return r;
    }
    renderTable(table) {
        let datas = this.createTableDatas(table);
        return { datas: datas };
    }
    createTableDatas(table) {
        let sendData = [];
        let types = table.getTypes();
        let names = table.getNames();
        let descs = table.getDescs();
        let defaults = table.getDefaults();
        sendData.push({ cells: this.createTableTopInfo(types, defaults, false, 0) });
        sendData.push({ cells: this.createTableTopInfo(types, types, true, 1) });
        sendData.push({ cells: this.createTableTopInfo(types, descs, false, 2) });
        sendData.push({ cells: this.createTableTopInfo(types, names, false, 3) });
        for (let i = parse_table_1.ParseTableInfo.TrusRowIndex; i <= table.getCount(); i++) {
            let sendObject = [];
            let datas = table.getDatas(i);
            if (!datas) {
                continue;
            }
            for (let i = 0; i < types.length; i++) {
                let type = types[i];
                if (type.Value === parse_xlsx_1.ParseXlsx.ExplanatoryNote) {
                    continue;
                }
                sendObject.push(this.renderItem(datas[i]));
            }
            sendData.push({ cells: sendObject });
        }
        return sendData;
    }
    createTableTopInfo(types, datas, isType = false, style = -1) {
        let sendTopObject = [];
        for (let i = 0; i < types.length; i++) {
            let data = datas[i];
            let type = types[i];
            if (type.Value === parse_xlsx_1.ParseXlsx.ExplanatoryNote) {
                continue;
            }
            if (isType) {
                sendTopObject.push(this.renderTopTypeItem(this.renderTopItem(data), style));
            }
            else {
                sendTopObject.push(this.renderTopItem(data, style));
            }
        }
        return sendTopObject;
    }
}
exports.RenderXSpeedTable = RenderXSpeedTable;
RenderXSpeedTable.tranforTypeToChina = {
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
};
//# sourceMappingURL=render_xspeed_table.js.map