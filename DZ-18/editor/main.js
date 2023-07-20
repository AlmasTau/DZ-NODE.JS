const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const path = require('path');
const fs = require('fs');
const html2rtf = require('html-to-rtf');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 900,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preloader.js')
        }
        
    });
    win.loadFile('public/index.html');
    // win.loadURL('https://github.com/vitnemikin');
}

app.whenReady()
    .then(() => {
        ipcMain.handle('save', saveTextToFile)
        createWindow();
    });

app.on('window-all-closed', app.quit);

function saveTextToFile(ev, text) {
    let rtf = html2rtf.convertHtmlToRtf(text);
    let fname = dialog.showSaveDialogSync();
    if (!fname.endsWith('.rtf')) fname += '.rtf';
    html2rtf.saveRtfInFile(fname, rtf)
}
