
const path = require('path')
const electron = require('electron')

const ipc = electron.ipcMain
const app = electron.app
const Menu = electron.Menu
const Tray = electron.Tray
const BrowserWindow = electron.BrowserWindow


let appIcon = null
let win

function createWindow() {
    // 创建一个新的浏览器窗口
    win = new BrowserWindow({
        width: 800, 
        height: 600
    })

    // 并且装载应用的index.html页面
    win.loadURL(`file://${__dirname}/index.html`)


    // 打开开发工具页面
    win.webContents.openDevTools()

    // 当窗口关闭时调用的方法
    win.on('closed', () => {
        // 解除窗口对象的引用，通常而言如果应用支持多个窗口的话，你会在一个数组里
        // 存放窗口对象，在窗口关闭的时候应当删除相应的元素。
        win = null;
    })

    win.webContents.on('did-finish-load', () => {
       console.log('load finished!!')
    })
}

// 当Electron完成初始化并且已经创建了浏览器窗口，则该方法将会被调用。
// 有些API只能在该事件发生后才能被使用。
app.on('ready', createWindow)

// 当所有的窗口被关闭后退出应用
app.on('window-all-closed', () => {
    // 对于OS X系统，应用和相应的菜单栏会一直激活直到用户通过Cmd + Q显式退出
    if (process.platform !== 'darwin') {
        app.quit()
    }
    if (appIcon) appIcon.destroy()
});

app.on('activate', () => {
    // 对于OS X系统，当dock图标被点击后会重新创建一个app窗口，并且不会有其他
    // 窗口打开
    if (win === null) {
      createWindow()
    }
});



ipc.on('put-in-tray', function (event) {
    const iconName = process.platform === 'win32' ? 'app.png' : 'app.png'
    const iconPath = path.join(__dirname, iconName)
    appIcon = new Tray(iconPath)
    const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示',
      click: function () {
          if (win) win.show();
      }
    },{
      label: '退出',
      click: function () {
          if (win) win = null;
          if (process.platform !== 'darwin') {
              app.quit()
              console.log('EXIT!')
          }
          if (appIcon) appIcon.destroy()
      }
    }])
    appIcon.setToolTip('在托盘中的 Electron 示例.')
    appIcon.setContextMenu(contextMenu)
    win.isVisible() ? win.hide() : win.show()
})

ipc.on('remove-tray', function () {
    appIcon.destroy()
})