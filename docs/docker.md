# Docker コマンド早見表

## 前提
- `docker-compose.yml` があるディレクトリで実行すること
- プロジェクトルート: `~/kintone-customizations`

## 基本コマンド

```bash
# プロジェクトに移動
cd ~/kintone-customizations

# 起動
docker compose up

# 起動（再ビルドあり）
docker compose up --build

# 停止
docker compose down

# コンテナに入る
docker compose exec kintone sh
```

## 開発コマンド（コンテナ内で実行）

```bash
# アプリ生成
docker compose exec kintone pnpm generate

# 特定アプリをビルド
docker compose exec kintone pnpm --filter @kintone/quotation-app build

# 開発環境にデプロイ
docker compose exec kintone pnpm --filter @kintone/quotation-app deploy

# 本番にリリース
docker compose exec kintone pnpm --filter @kintone/quotation-app release
```

## 新メンバーのセットアップ

```bash
# 1. WSL2 で作業
wsl

# 2. クローン
git clone https://github.com/nyaan-git/kintone-customizations.git
cd kintone-customizations

# 3. 環境変数を設定
cp .env.example .env
vim .env  # kintone の認証情報を入力

# 4. 起動
docker compose up
```

## Docker なしで開発する場合

```bash
cd ~/kintone-customizations/apps/quotation-app
pnpm dev:kintone
```

## トラブルシューティング

```bash
# コンテナを完全に作り直す
docker compose down
docker compose up --build

# キャッシュも含めて削除
docker compose down --volumes --rmi all
```
