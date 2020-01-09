import { IpcObject } from "./ipc_object";
import { IpcMainEvent, app, dialog, OpenDialogReturnValue } from "electron";
import fs from "fs";
import { WriterJson } from "../writer/writer_json";
import { ParseXlsx } from "../parse/parse_xlsx";
import { ParseInfo } from "../parse/parse_info";
import { WriterTemplateTs } from "../writer/writer_template_ts";
import { TemplateMgr } from "../template/template_mgr";

export class IpcParseTable extends IpcObject {
    public name: string = "IpcParseTable";

    public do(event: IpcMainEvent, ...args: any[]) {
        // dialog.showOpenDialog({
        //     properties: ["openDirectory"]
        // }).then((openDialogReturnValue: OpenDialogReturnValue) => {
        //     if (!openDialogReturnValue.canceled) {
        //         this.parseDirXlsx(openDialogReturnValue.filePaths[0]);
        //     }
        // });

        console.debug('main', args[0]);
        this.parseDirXlsx("D:\\code\\Table");
        event.reply('world', '123');
    }

    public parseDirXlsx(path: string, isBranch: boolean = false) {
        // 只提供一层目录遍历 降低分支的复杂度
        let branchDir: string[] = [];
        let dirList = fs.readdirSync(path);
        dirList.forEach((file: string) => {
            console.debug(file);
            let stat = fs.statSync(path + "\\" + file);
            if (stat && stat.isDirectory() && !isBranch) {
                branchDir.push(path + "\\" + file);
            } else {
                let buffer: Buffer = fs.readFileSync(path + "\\" + file);
                let xlsx: ParseXlsx = new ParseXlsx();
                xlsx.parseToData(buffer, (data: ParseInfo) => {
                    let w = new WriterJson();
                    w.write(data, "");
                    let wts = new WriterTemplateTs();
                    wts.write(data, TemplateMgr.Ins.getTempData("ts"));
                });
            }
        });

        //拥有分支
        if (branchDir.length > 0) {
            for (let branchDirPath of branchDir) {
                this.parseDirXlsx(branchDirPath, true);
            }
        }
    }
}