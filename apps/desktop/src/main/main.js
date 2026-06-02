const { app, BrowserWindow, ipcMain, desktopCapturer, screen } = require('electron')
const path = require('path')
const { spawn } = require('child_process')
const os = require('os')

let mainWindow
let terminalProcess

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    icon: path.join(__dirname, '../assets/icon.png'),
    titleBarStyle: 'hidden',
  })

  const isDev = process.env.NODE_ENV === 'development'
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadURL('http://localhost:3000')
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (terminalProcess) {
    terminalProcess.kill()
  }
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.handle('get-platform', () => {
  return process.platform
})

ipcMain.handle('get-screenshots', async () => {
  const sources = await desktopCapturer.getSources({
    types: ['screen'],
    thumbnailSize: { width: 1920, height: 1080 },
  })
  return sources.map((s) => ({
    name: s.name,
    id: s.id,
    thumbnail: s.thumbnail.toDataURL(),
  }))
})

ipcMain.handle('terminal-create', (event, { shell, cwd }) => {
  const defaultShell = process.platform === 'win32'
    ? (process.env.COMSPEC || 'cmd.exe')
    : (process.env.SHELL || '/bin/bash')

  terminalProcess = spawn(defaultShell, [], {
    cwd: cwd || os.homedir(),
    env: process.env,
  })

  terminalProcess.stdout.on('data', (data) => {
    mainWindow.webContents.send('terminal-data', data.toString())
  })

  terminalProcess.stderr.on('data', (data) => {
    mainWindow.webContents.send('terminal-data', data.toString())
  })

  terminalProcess.on('exit', () => {
    mainWindow.webContents.send('terminal-exit')
  })
})

ipcMain.handle('terminal-write', (event, data) => {
  if (terminalProcess) {
    terminalProcess.stdin.write(data)
  }
})

ipcMain.handle('terminal-resize', (event, { cols, rows }) => {
  if (terminalProcess && terminalProcess.stdout) {
    terminalProcess.stdout.setWindowSize(rows, cols)
  }
})

ipcMain.handle('terminal-kill', () => {
  if (terminalProcess) {
    terminalProcess.kill()
    terminalProcess = null
  }
})

ipcMain.handle('window-minimize', () => {
  mainWindow.minimize()
})

ipcMain.handle('window-maximize', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow.maximize()
  }
})

ipcMain.handle('window-close', () => {
  mainWindow.close()
})
