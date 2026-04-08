@echo off
chcp 65001 > nul
echo =========================================
echo GitHubへのアップロード（保存）を開始します...
echo =========================================

cd /d "%~dp0"

echo.
echo [1/3] 変更を準備しています...
git add .

echo.
echo [2/3] 変更を記録しています...
set /p commit_message="変更内容のメモを入力してください（そのままEnterでもOKです）: "
if "%commit_message%"=="" set commit_message="Auto update"
git commit -m "%commit_message%"

echo.
echo [3/3] GitHubへ送信しています...
git push

echo.
echo =========================================
echo アップロードが完了しました！この画面は閉じても大丈夫です。
echo =========================================
pause
