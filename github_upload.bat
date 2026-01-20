@echo off
echo --- GitHubへのアップロードを開始します ---

git add .
echo [1/3] ファイルをステージングに追加しました。

set /p message="コミットメッセージを入力してください（空欄なら 'update'）: "
if "%message%"=="" set message=update

git commit -m "%message%"
echo [2/3] コミットしました。

git push origin main
echo [3/3] GitHubにアップロードが完了しました！

pause