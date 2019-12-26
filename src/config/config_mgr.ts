import fs from "fs";

export interface ConfigData {
    excelPath: string;          // 数据目录
    excelBranch: string[];      // 数据分支
    generateMouldPath: string;  // 生成模板目录
}

export class ConfigMgr {
    private static ins: ConfigMgr;
    private configJson: ConfigData;
    private configPath: string = "D:\\code\\Monitor\\config.json";

    public static get Ins(): ConfigMgr {
        if (!ConfigMgr.ins) {
            ConfigMgr.ins = new ConfigMgr;
        }
        return ConfigMgr.ins;
    }

    public init() {
        this.clear();
        let configFile = fs.readFileSync(this.configPath);
        if (configFile) {
            let configString = configFile.toString("UTF-8");
            if (configString) {
                let json = JSON.parse(configString);
                this.configJson.excelBranch = json["excelBranch"];
                this.configJson.excelPath = json["excelPath"];
                this.configJson.generateMouldPath = json["generateMouldPath"];
            }
        }
    }

    public uninit() {
        this.clear();
    }

    public clear() {
        this.configJson = <ConfigData>{};
    }

    public writeExcelPath(value: string) {
        this.configJson.excelPath = value;
        this.syncConfig();
    }

    public writeExcelBranch(values: string[]) {
        if (!this.configJson.excelBranch) {
            this.configJson.excelBranch = [];
        }

        this.configJson.excelBranch = values;
        this.syncConfig();
    }

    public addBranch(value: string) {
        if (!this.configJson.excelBranch) {
            this.configJson.excelBranch = [];
        }

        this.configJson.excelBranch.push(value);
        this.syncConfig();
    }

    public removeBranch(value: string) {
        if (!this.configJson.excelBranch) {
            return;
        }

        var index = this.configJson.excelBranch.indexOf(value);
        if (index > -1) {
            this.configJson.excelBranch.splice(index, 1);
        }
        
        this.syncConfig();
    }

    public writeExcelGenerateMouldPath(value: string) {
        this.configJson.generateMouldPath = value;
        this.syncConfig();
    }

    public get Config(): ConfigData {
        return this.configJson;
    }

    private syncConfig() {
        fs.writeFileSync(this.configPath, this.configJson);
    }
}