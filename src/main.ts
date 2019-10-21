import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import * as path from "path";
import { ParseXlsx } from "./parse/parse_xlsx";
import { ParseTableInfo } from "./parse/parse_table";
import { RenderLayuiTable } from "./render/render_layui_table";
import { RenderXSpeedTable } from "./render/render_xspeed_table";

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
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
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

let parse = new ParseXlsx();
let renderLayuiTable = new RenderLayuiTable();
let renderXSpeedTable = new RenderXSpeedTable();
let xlsxData = parse.parseToFile("qq.xlsx");
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("start-table", (event: IpcMainEvent, data) => {
  let xlsxTables = renderLayuiTable.renderTableList(xlsxData);
  let renderData = renderLayuiTable.render(xlsxData);
  let renderData2 = renderXSpeedTable.render(xlsxData);
  event.sender.send("start-table", renderData, xlsxTables, renderData2);
});