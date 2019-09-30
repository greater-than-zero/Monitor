import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import * as path from "path";
import { ParseXlsx } from "./parse/parse_xlsx";
import { ParseTableInfo } from "./parse/parse_table";

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
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
let xlsxData = parse.parseToFile("qq.xlsx");
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("start-table", (event: IpcMainEvent, data) => {
  let tables = xlsxData.getTables();
  for (let key in xlsxData.getTables()) {
    let table = tables[key];
    if (!table) {
      continue;
    }

    let cols = [];
    let sendData = [];
    let descs = table.getDescs();
    let types = table.getTypes();
    let names = table.getNames();
    for (let i = 0; i < types.length; i++) {
      let type = types[i];
      let desc = descs[i];
      let name = names[i];
      if (type.Value === "#") {
        continue;
      }

      let col = {};
      if (i === 0) {
        col = { field: name.Value, title: "id", width: 80, sort: true, fixed: "left", minWidth: 300 };
      } else {
        col = { field: name.Value, title: desc.Value, sort: true, minWidth: 300, style: "background-color: #5FB878; color: #fff;"  };
      }

      cols.push(col);
    }

    for (let i = ParseTableInfo.TrusRowIndex; i < table.getTrueCount(); i++) {
      let sendObject: { [index: string]: string } = {};
      let datas = table.getDatas(i);
      if (!datas) {
        continue;
      }

      for (let i = 0; i < types.length; i++) {
        let type = types[i];
        let name = names[i];
        if (type.Value === "#") {
          continue;
        }

        sendObject[name.Value] = datas[i].Value;
      }

      sendData.push(sendObject);
    }

    event.sender.send("start-table", cols, sendData);
  }

  //   , cols: [[ //表头
  //     , { field: 'id', title: 'ID', width: 80, sort: true}
  //     , { field: 'username', title: '用户名', width: 80 }
  //     , { field: 'experience', title: '积分', width: 90, sort: true, totalRow: true }
  //     , { field: 'sex', title: '性别', width: 80, sort: true }
  //     , { field: 'score', title: '评分', width: 80, sort: true, totalRow: true }
  //     , { field: 'city', title: '城市', width: 150 }
  //     , { field: 'sign', title: '签名', width: 200 }
  //     , { field: 'classify', title: '职业', width: 100 }
  //     , { field: 'wealth', title: '财富', width: 135, sort: true, totalRow: true }
  //     , { fixed: 'right', width: 165, align: 'center', toolbar: '#barDemo' }
  // ]],

});