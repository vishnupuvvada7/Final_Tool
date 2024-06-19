const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const { execFile } = require('child_process');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false // Ensure context isolation is disabled
    }
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

// Listen for 'run-audit' event from renderer process
// Listen for 'run-audit' event from renderer process
ipcMain.on('run-audit', (event) => {
  const executablePath = path.join(__dirname, 'Backend\\retrieval.js');

  execFile('node', [executablePath], (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', error);
      event.reply('audit-result', `Error: ${error.message}`);
      return;
    }
    console.log('Output:', stdout);
    event.reply('audit-result', `PDF Generated Successfully\n  ${stdout} `);
  });
});

ipcMain.on('logs-generate', (event) => {
  const executablePath = path.join(__dirname, 'Backend\\logs.js');

  execFile('node', [executablePath], (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', error);
      event.reply('audit-result', `Error: ${error.message}`);
      return;
    }
    console.log('Output:', stdout);
    event.reply('audit-result', `Logs are generating, please check for WindowsLogs folder on Desktop\n  ${stdout}`);
  });
});

ipcMain.on('services-off', (event) => {
  const executablePath = path.join(__dirname, 'Backend\\services.js');

  execFile('node', [executablePath], (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', error);
      event.reply('audit-result', `Error: ${error.message}`);
      return;
    }
    console.log('Output:', stdout);
    event.reply('audit-result', `RDP Services have been disabled and 6/9 Secpol policies have been implemented\n  ${stdout}`);
  });
});

ipcMain.on('percent-temp', (event) => {
  const executablePath = path.join(__dirname, 'Backend\\percent_temp.js');

  execFile('node', [executablePath], (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', error);
      event.reply('audit-result', `Error: ${error.message}`);
      return;
    }
    console.log('Output:', stdout);
    event.reply('audit-result', `%temp% files have been cleared\n  ${stdout}`);
  });
});

ipcMain.on('temp', (event) => {
  const executablePath = path.join(__dirname, 'Backend\\temp.js');

  execFile('node', [executablePath], (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', error);
      event.reply('audit-result', `Error: ${error.message}`);
      return;
    }
    console.log('Output:', stdout);
    event.reply('audit-result', `Temp files have been cleared\n  ${stdout}`);
  });
});

ipcMain.on('prefetch-off', (event) => {
  const executablePath = path.join(__dirname, 'Backend\\prefetch.js');

  execFile('node', [executablePath], (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', error);
      event.reply('audit-result', `Error: ${error.message}`);
      return;
    }
    console.log('Output:', stdout);
    event.reply('audit-result', `Prefetch files have been cleared\n  ${stdout}`);
  });
});

ipcMain.on('recycle-off', (event) => {
  const executablePath = path.join(__dirname, 'Backend\\recycle.js');

  execFile('node', [executablePath], (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', error);
      event.reply('audit-result', `Error: ${error.message}`);
      return;
    }
    console.log('Output:', stdout);
    event.reply('audit-result', `Recycle Bin files has been cleared\n  ${stdout}`);
  });
});
// Listen for 'open-result-file' event from renderer process
ipcMain.on('open-result-file', (event) => {
  const pdfPath = path.join(app.getAppPath(), 'Audit_report.pdf');
  shell.openPath(pdfPath).then(response => {
    if (response) {
      console.error('Error opening PDF:', response);
    }
  });
});