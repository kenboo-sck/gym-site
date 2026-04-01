@echo off
chcp 65001 > nul
echo --- GitHubへの同期を開始します ---
echo [1/4] GitHubから最新の変更を取得しています...
git pull origin main
git add .
echo [2/4] ファイルをステージングに追加しました。
set /p message="コミットメッセージを入力してください（空欄なら 'update'）: "
if "%message%"=="" set message=update
git commit -m "%message%"
echo [3/4] コミットしました。
echo [4/4] GitHubにアップロードしています...
git push origin main
if %errorlevel% neq 0 (
    echo [ERROR] アップロードに失敗しました。
    pause
    exit /b
)
echo 同期が完了しました！
pause