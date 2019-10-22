"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const parse_xlsx_1 = require("./parse/parse_xlsx");
const render_layui_table_1 = require("./render/render_layui_table");
const render_xspeed_table_1 = require("./render/render_xspeed_table");
let mainWindow;
function createWindow() {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInSubFrames: true,
        },
        width: 800,
    });
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "../index.html"));
    // Open the DevTools.
    //mainWindow.webContents.openDevTools();
    // Emitted when the window is closed.
    mainWindow.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", createWindow);
// Quit when all windows are closed.
electron_1.app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
let parse = new parse_xlsx_1.ParseXlsx();
let renderLayuiTable = new render_layui_table_1.RenderLayuiTable();
let renderXSpeedTable = new render_xspeed_table_1.RenderXSpeedTable();
let xlsxData = parse.parseToFile("qq.xlsx");
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
electron_1.ipcMain.on("start-table", (event, data) => {
    let xlsxTables = renderLayuiTable.renderTableList(xlsxData);
    let renderData = renderLayuiTable.render(xlsxData);
    let renderData2 = renderXSpeedTable.render(xlsxData);
    console.log(event, data);
    event.reply("start-table", renderData, xlsxTables, renderData2);
});
//# sourceMappingURL=main.js.map