xcopy .\moon-win32-x64 .\publish\ /Y
xcopy .\moon-win32-x64\resources\electron.asar .\publish\resources\ /Y
xcopy .\moon-win32-x64\resources\app\main.js .\publish\resources\app\ /Y
xcopy .\moon-win32-x64\resources\app\package.json .\publish\resources\app\ /Y
xcopy .\dist .\publish\resources\app\dist\ /Y
xcopy .\electron .\publish\resources\app\electron\ /Y