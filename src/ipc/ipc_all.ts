import { IpcObject } from "./ipc_object";
import { IpcParseTable } from "./ipc_parse_table";
import { ipcMain, IpcMainEvent } from "electron";
import { IpcParseTemplate } from "./ipc_parse_template";

export class IpcAll {
    private ipcList: IpcObject[] = []

    public init() {
        this.ipcList.push(new IpcParseTable);
        this.ipcList.push(new IpcParseTemplate);

        for (let item of this.ipcList) {
            if (!item || item.name === "") {
                continue;
            }

            ipcMain.on(item.name, (event: IpcMainEvent, ...args: any[])=> {
                item.do.call(item, event, args);
            });
        }
    }

    public unInit() {

    }
}