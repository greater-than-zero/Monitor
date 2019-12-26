export const enum ParseTableFormulaType {
    None = 0,
    Master = 1,
    Shared = 2
}

export const enum ParseTableValueType {
    Null = 0,
    Merge = 1,
    Number = 2,
    String = 3,
    Date = 4,
    Hyperlink = 5,
    Formula = 6,
    SharedString = 7,
    RichText = 8,
    Boolean = 9,
    Error = 10
}

export const enum ParseTableStringType {
    int = "i",
    string = "s",
    float = "f",
    boolean = "b",
    Dir = "d",
    
    arrayInt = "ai",
    arrayString = "as",
    arrayfloat = "af",

    array2Int = "aii",
    array2String = "ass",
    array2float = "aff",
}

export class ParseTableItem {
    private value?: string;
    private formula: string;
    private cell: string;
    private formulaType: ParseTableFormulaType;
    private type: ParseTableValueType;
    private fontColor: string;
    private bgColor: string;
    private address: string;

    public get Type(): ParseTableValueType {
        return this.type;
    }

    public set Type(value: ParseTableValueType) {
        this.type = value;
    }

    public get FormulaType(): ParseTableFormulaType {
        return this.formulaType;
    }

    public set FormulaType(value: ParseTableFormulaType) {
        this.formulaType = value;
    }

    public get Cell(): string {
        return this.cell;
    }

    public set Cell(value: string) {
        this.cell = value;
    }

    public get Formula(): string {
        return this.formula;
    }

    public set Formula(value: string) {
        this.formula = value;
    }

    public get Value(): string {
        return this.value;
    }

    public set Value(value: string) {
        this.value = value;
    }

    public get FontColor(): string {
        return this.fontColor;
    }

    public set FontColor(value: string) {
        this.fontColor = value;
    }

    public get BgColor(): string {
        return this.bgColor;
    }

    public set BgColor(value: string) {
        this.bgColor = value;
    }

    public get Address(): string {
        return this.address;
    }

    public set Address(value: string) {
        this.address = value;
    }
}

export class ParseTableInfo {
    private tableName: string;
    private rows: { [index: number]: ParseTableItem[] } = {};
    public static TrusRowIndex = 5;

    constructor() {
        this.rows = {};
    }

    public get Name(): string {
        return this.tableName;
    }

    public set Name(value: string) {
        this.tableName = value;
    }

    public addRow(cloumnIndex: number, row: ParseTableItem) {
        if (!this.rows[cloumnIndex]) {
            this.rows[cloumnIndex] = [];
        }

        this.rows[cloumnIndex].push(row);
    }

    public getDefaults(): ParseTableItem[] {
        return this.rows[1];
    }

    public getTypes(): ParseTableItem[] {
        return this.rows[2];
    }

    public getDescs(): ParseTableItem[] {
        return this.rows[3];
    }

    public getNames(): ParseTableItem[] {
        return this.rows[4];
    }

    public getDatas(index: number): ParseTableItem[] {
        return this.rows[index];
    }

    public getTrueCount(): number {
        let all = Object.keys(this.rows).length;
        return all - (all - 5);
    }

    public getCount(): number {
        return Object.keys(this.rows).length;
    }
}
