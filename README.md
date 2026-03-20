# kintone-monorepo-template

kintone カスタマイズ開発のためのモノレポテンプレート。

## 特徴

- **React + TypeScript** - モダンなフロントエンド開発
- **Vite** - 高速ビルド
- **Turborepo** - モノレポ管理 & ビルド最適化
- **自動アップロード** - ファイル保存で kintone に即反映
- **CLIジェネレーター** - コマンド1つで新規アプリ作成
- **CI/CD** - GitHub Actions で自動テスト & デプロイ
- **Docker** - 環境構築の簡略化

## クイックスタート

### 1. テンプレートを使用

```bash
# このリポジトリをテンプレートとしてクローン
git clone https://github.com/nyaan-git/kintone-monorepo-template.git my-kintone-project
cd my-kintone-project

# git履歴をリセット（新しいプロジェクトとして開始）
rm -rf .git
git init
```

### 2. 環境変数を設定

```bash
cp .env.example .env
```

`.env` を編集して kintone の認証情報を入力：

```
KINTONE_BASE_URL=https://xxxxx.cybozu.com
KINTONE_USERNAME=your-username
KINTONE_PASSWORD=your-password
```

### 3. 依存関係インストール

```bash
pnpm install
```

### 4. 新しいアプリを作成

```bash
pnpm generate
```

対話形式で入力：

```
🚀 kintone アプリ ジェネレーター

✔ アプリ名は？（例: customer-app） … quotation-app
✔ kintone アプリIDは？ … 123
✔ 本番用アプリIDは？（後で設定する場合は空エンター） …

📁 quotation-app を作成中...

✅ 完了！
```

### 5. 開発開始

```bash
cd apps/quotation-app
pnpm dev:kintone
```

ファイルを保存すると自動でビルド & kintone にアップロードされる。

## コマンド一覧

| コマンド | 場所 | 説明 |
|----------|------|------|
| `pnpm generate` | ルート | 新しいアプリを作成 |
| `pnpm build` | ルート | 全アプリをビルド |
| `pnpm dev:kintone` | 各アプリ | 開発モード（自動アップロード） |
| `pnpm deploy` | 各アプリ | 開発環境にデプロイ |
| `pnpm release` | 各アプリ | 本番環境にリリース |

## プロジェクト構成

```
kintone-monorepo-template/
├── apps/                    # アプリケーション（ここに生成される）
├── packages/                # 共通パッケージ
├── templates/               # アプリテンプレート
│   └── app-template/
├── scripts/                 # スクリプト
│   └── generate-app.mjs     # アプリ生成
├── docs/                    # ドキュメント
│   └── docker.md
├── .github/workflows/       # CI/CD
│   ├── ci.yml               # 自動テスト
│   └── release.yml          # 自動リリース
├── docker-compose.yml
├── turbo.json
└── pnpm-workspace.yaml
```

## Docker

Docker を使う場合：

```bash
# 起動
docker compose up

# コンテナ内でコマンド実行
docker compose exec kintone pnpm generate
docker compose exec kintone pnpm build
```

詳細は [docs/docker.md](docs/docker.md) を参照。

## ブランチ運用

```
main     ← 本番用コード
develop  ← 開発用コード
  └── feature/xxx ← 機能開発
```

### 検証コード

`import.meta.env.DEV` で囲むと本番ビルドで除外される：

```tsx
if (import.meta.env.DEV) {
  console.log('デバッグ:', data)
}
```

## CI/CD

### 自動チェック（全ブランチ）

push すると自動で実行：
- TypeScript 型チェック
- ESLint
- ビルド確認

### 本番リリース（main ブランチ）

`main` に push すると、変更があったアプリだけ自動で本番リリース。

## 必要なもの

- Node.js 20+
- pnpm
- Docker（オプション）

## ライセンス

MIT
