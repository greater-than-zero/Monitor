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

export class ParseTableItem {
    private value?: number | string | Date;
    private formula: string;
    private cell: string;
    private formulaType: ParseTableFormulaType;
    private type: ParseTableValueType;
    private fontColor: string;
    private bgColor: string;

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

    public get Value(): number | string | Date {
        return this.value;
    }

    public set Value(value: number | string | Date) {
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
}

export class ParseTableInfo {
    private tableName: string;
    private rows: ParseTableItem[];
    private cols: ParseTableItem[];

    public get Name(): string {
        return this.tableName;
    }

    public set Name(value: string) {
        this.tableName = value;
    }
}
