"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParseTableItem {
    get Type() {
        return this.type;
    }
    set Type(value) {
        this.type = value;
    }
    get FormulaType() {
        return this.formulaType;
    }
    set FormulaType(value) {
        this.formulaType = value;
    }
    get Cell() {
        return this.cell;
    }
    set Cell(value) {
        this.cell = value;
    }
    get Formula() {
        return this.formula;
    }
    set Formula(value) {
        this.formula = value;
    }
    get Value() {
        return this.value;
    }
    set Value(value) {
        this.value = value;
    }
    get FontColor() {
        return this.fontColor;
    }
    set FontColor(value) {
        this.fontColor = value;
    }
    get BgColor() {
        return this.bgColor;
    }
    set BgColor(value) {
        this.bgColor = value;
    }
    get Address() {
        return this.address;
    }
    set Address(value) {
        this.address = value;
    }
}
exports.ParseTableItem = ParseTableItem;
class ParseTableInfo {
    constructor() {
        this.rows = {};
        this.rows = {};
    }
    get Name() {
        return this.tableName;
    }
    set Name(value) {
        this.tableName = value;
    }
    addRow(cloumnIndex, row) {
        if (!this.rows[cloumnIndex]) {
            this.rows[cloumnIndex] = [];
        }
        this.rows[cloumnIndex].push(row);
    }
    getDefaults() {
        return this.rows[1];
    }
    getTypes() {
        return this.rows[2];
    }
    getDescs() {
        return this.rows[3];
    }
    getNames() {
        return this.rows[4];
    }
    getDatas(index) {
        return this.rows[index];
    }
    getTrueCount() {
        return Object.keys(this.rows).length - 3;
    }
}
exports.ParseTableInfo = ParseTableInfo;
ParseTableInfo.TrusRowIndex = 5;
//# sourceMappingURL=parse_table.js.map