# Dawn
2018/09/13
## 目標
使用Electron

## 安裝Electron
```
Moon>npm i -D electron@3.0.0-beta.12
```
## 修改 Moon
修改angular.json
```
"outputPath": "dist",
```
新增electron/main.js, 以前放在Root, 結果不能Debug
```js
const { app, BrowserWindow } = require('electron')

let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#ffffff',
        icon: `file://${__dirname}/../dist/assets/logo.png`
    })


    win.loadURL(`file://${__dirname}/../dist/index.html`)

    // uncomment below to open the DevTools.
    // win.webContents.openDevTools()

    // Event when the window is closed.
    win.on('closed', function () {
        win = null
    })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
        createWindow()
    }
})
```
修改package.json
```json
"name": "moon",
"version": "0.0.0",
"main": "electron/main.js",
"scripts": {
"ng": "ng",
"start": "ng serve --proxy-config proxy.conf.json",
"build": "ng build --prod",
"test": "ng test",
"lint": "ng lint",
"e2e": "ng e2e",
"ele": "ng build --prod && electron ."
```
## 測試
```
Sun>dotnet run
Moon>npm run ele
```
## 打包
安裝electron-packager

```
Moon>npm i electron-packager@12.1.2 -g
```
打包(等2分鐘,感覺沒反應)
```
Moon>electron-packager . --platform=win32 --overwrite
```
執行
```
Sun>dotnet run
>Moon\moon-win32-x64\moon.exe
```
## 佈署
新增publish.bat
```cmd
xcopy .\moon-win32-x64 .\publish\ /Y
xcopy .\moon-win32-x64\resources\electron.asar .\publish\resources\ /Y
xcopy .\moon-win32-x64\resources\app\main.js .\publish\resources\app\ /Y
xcopy .\moon-win32-x64\resources\app\package.json .\publish\resources\app\ /Y
xcopy .\dist .\publish\resources\app\dist\ /Y
xcopy .\electron .\publish\resources\app\electron\ /Y
```
佈署
```
Moon>ng run build
Moon>publish.bat
```
執行
```
Sun>dotnet run
>Moon\publish\moon.exe
```

## 版控
修改Moon\.gitignore
```
# electron
moon-win32-x64/
publish/
```
版控
```
Dawn>git add .
Dawn>git commit -m "electron"
```