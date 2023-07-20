const { ipcRenderer, contextBridge, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const RtfParser = require('rtf-parser');

contextBridge.exposeInMainWorld('backend', {
    save: (text) => ipcRenderer.invoke('save', text),
    load: async () => await ipcRenderer.invoke('load'),
    convertToRtf: async (htmlContent) => await ipcRenderer.invoke('convertToRtf', htmlContent),
});

ipcRenderer.on('convertToRtf', async (event, htmlContent) => {
    const rtfParser = new RtfParser();
    rtfParser.parseHtml(htmlContent);

    const rtfContent = rtfParser.render();

    event.sender.send('convertToRtf', rtfContent);
});

ipcRenderer.on('load', async (event) => {
    const fileFilters = [{ name: 'RTF Files', extensions: ['rtf'] }];
    const fileNames = dialog.showOpenDialogSync({ properties: ['openFile'], filters: fileFilters });

    if (fileNames && fileNames.length > 0) {
        const filePath = fileNames[0];

        try {
            const rtfContent = fs.readFileSync(filePath, 'utf-8');

            const rtfParser = new RtfParser();
            rtfParser.parse(rtfContent);
            const htmlContent = rtfParser.content.html;

            event.sender.send('load', htmlContent);
        } catch (error) {
            console.error('Error while reading or converting the file:', error);
        }
    }
});
