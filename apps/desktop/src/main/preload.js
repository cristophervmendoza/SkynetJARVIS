const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('nexa', {
  platform: () => ipcRenderer.invoke('get-platform'),
  screenshots: () => ipcRenderer.invoke('get-screenshots'),

  terminal: {
    create: (options) => ipcRenderer.invoke('terminal-create', options),
    write: (data) => ipcRenderer.invoke('terminal-write', data),
    resize: (size) => ipcRenderer.invoke('terminal-resize', size),
    kill: () => ipcRenderer.invoke('terminal-kill'),
    onData: (callback) => {
      ipcRenderer.on('terminal-data', (event, data) => callback(data))
    },
    onExit: (callback) => {
      ipcRenderer.on('terminal-exit', () => callback())
    },
  },

  window: {
    minimize: () => ipcRenderer.invoke('window-minimize'),
    maximize: () => ipcRenderer.invoke('window-maximize'),
    close: () => ipcRenderer.invoke('window-close'),
  },
})
