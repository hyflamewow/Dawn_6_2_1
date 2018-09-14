# Dawn
2018/09/13
## 目標
Debug
## Visual Studio Code 安裝
Debugger for Chrome (目前4.10.1)
1. 在Windows的[所有程式]裡的[Goole Chrome], [內容]->[捷徑]->[目標]設定以下
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222
2. 在Visual Studio Code的除錯, 組態設為Chrome
3. 修改launch.json
```json
"url": "http://localhost:4200",
```
## 測試
```
Sun>dotnet run
Moon>npm start
```
1. 設中斷點
2. 除錯

## 版控
```
Dawn>git add .
Dawn>git commit -m "debug"
```