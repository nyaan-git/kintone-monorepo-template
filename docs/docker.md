# Docker コマンド早見表

## 前提
- `docker-compose.yml` があるディレクトリで実行すること
- プロジェクトルート: `~/your-project`

## 基本コマンド

```bash
# プロジェクトに移動
cd ~/your-project

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
docker compose exec kintone pnpm --filter @kintone/your-app build

# 開発環境にデプロイ
docker compose exec kintone pnpm --filter @kintone/your-app deploy

# 本番にリリース
docker compose exec kintone pnpm --filter @kintone/your-app release
```

## 新メンバーのセットアップ

```bash
# 1. WSL2 で作業
wsl

# 2. クローン
git clone <your-repo-url>
cd your-project

# 3. 環境変数を設定
cp .env.example .env
vim .env  # kintone の認証情報を入力

# 4. 起動
docker compose up
```

## Docker なしで開発する場合

```bash
cd ~/your-project/apps/your-app
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
