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
}
exports.ParseTableItem = ParseTableItem;
class ParseTableInfo {
    get Name() {
        return this.tableName;
    }
    set Name(value) {
        this.tableName = value;
    }
}
exports.ParseTableInfo = ParseTableInfo;
//# sourceMappingURL=parse_table.js.map