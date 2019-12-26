import { IpcMainEvent } from "electron";

export class IpcObject {
    public name: string = "";

    public do(event: IpcMainEvent, ...args: any[]) {

    }
}