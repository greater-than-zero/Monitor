import { app, BrowserWindow, ipcMain, IpcMainEvent, dialog } from 'electron';
import path from 'path';
import url from 'url';
import { IpcAll } from '../ipc/ipc_all';
import { ConfigMgr } from '../config/config_mgr';

const isDev = process.env.NODE_ENV === 'development';
const port = parseInt(process.env.PORT!, 10) || 9000;
const devUrl = `http://localhost:${port}/`;

const prodUrl = url.format({
    pathname: path.resolve(__dirname, 'dist/index.html'),
    protocol: 'file',
    slashes: true,
});

let mainWindow: BrowserWindow | null;
let ipcAll = new IpcAll;

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInSubFrames: true,
        },
        width: 800,
    });
    // if (isDev) {
    mainWindow.loadURL(devUrl);
    // } else {
    //     mainWindow.loadFile(prodUrl);
    // }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcAll.init();
ConfigMgr.Ins.init();