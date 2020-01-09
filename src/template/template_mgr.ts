export enum TemplateSign {
    className = "@",
    attributeList = "$",
    function = "%",
}

export class TemplateMgr {
    private tempDataMap: { [index: string]: string } = {};

    private static ins: TemplateMgr;

    public static get Ins(): TemplateMgr {
        if (!TemplateMgr.ins) {
            TemplateMgr.ins = new TemplateMgr;
        }
        return TemplateMgr.ins;
    }

    public register(type: string, tempDataMap: string) {
        let tempData = this.tempDataMap[type];
        if (tempData) {
            console.warn("TemplateMgr register type is Exist! " + type);
        }

        this.tempDataMap[type] = tempDataMap;
    }

    public unregister(type: string) {
        this.tempDataMap[type] = null;
        delete this.tempDataMap[type];
    }

    public getTempData(type: string): string {
        return this.tempDataMap[type];
    }

    public getTempTyps(): string[] {
        let types = [];
        for (let key in this.tempDataMap) {
            types.push(key);
        }

        return types;
    }

    public clear() {
        this.tempDataMap = {};
    }
}