export class ParseTableInfo {
    private tableName: string;
    private rows: ParseTableRow[];
    private cols: ParseTableCol[];

    public get Name(): string {
        return this.tableName;
    }

    public set Name(value: string) {
        this.tableName = value;
    }
}

export class ParseTableRow {

}

export class ParseTableCol {

}