import { app, BrowserWindow } from "electron";
import url from "url";
import path from "path";
import { async } from "q";
import { access } from "fs";

const isDev = process.env.NODE_ENV === 'development';
const port = parseInt(process.env.PORT!, 10) || 9000;
const devUrl = `http://localhost:${port}/`;

const prodUrl = url.format({
    pathname: path.resolve(__dirname, 'dist/index.html'),
    protocol: 'file',
    slashes: true
});

const indexUrl = isDev ? devUrl : prodUrl;

let mainWindow: BrowserWindow | null;

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInSubFrames: true,
        },
        width: 800
    });

    if (isDev) {
        mainWindow.loadURL(devUrl);
    } else {
        mainWindow.loadFile(prodUrl);
    }

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
    if(mainWindow === null){
        createWindow();
    }
});