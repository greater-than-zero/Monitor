import { IpcObject } from "./ipc_object";
import { IpcMainEvent } from "electron";
import { TemplateMgr } from "../template/template_mgr";
import fs from "fs";
import { ConfigMgr } from "../config/config_mgr";

export class IpcParseTemplate extends IpcObject {
    public name: string = "IpcParseTemplate";

    public do(event: IpcMainEvent, ...args: any[]) {
        let p = new Promise(() => {
            let fileBuffile = fs.readFileSync(ConfigMgr.Ins.getTemplatePathOfType("ts").path);
            if (!fileBuffile) {
                return Promise.reject("err file is Not OK!");
            }

            // 模板这里注册
            TemplateMgr.Ins.register("ts", fileBuffile.toString("utf-8"));

            return Promise.resolve();
        }).catch(() => {
            event.reply('world', '3232');
        }).finally(() => {
            event.reply('world', '123');
        });
    }
}