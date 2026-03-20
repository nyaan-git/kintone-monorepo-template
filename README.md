# kintone-customizations

kintone カスタマイズ開発のためのモノレポ環境。

## 技術スタック

- **フロントエンド**: React + TypeScript
- **ビルド**: Vite
- **モノレポ**: Turborepo + pnpm workspaces
- **CI/CD**: GitHub Actions
- **コンテナ**: Docker

## セットアップ

### 必要なもの

- Node.js 20+
- pnpm
- Docker（オプション）

### インストール

```bash
# クローン
git clone https://github.com/nyaan-git/kintone-customizations.git
cd kintone-customizations

# 環境変数を設定
cp .env.example .env
# .env を編集して kintone の認証情報を入力

# 依存関係インストール
pnpm install
```

## 開発

### 新しいアプリを作成

```bash
pnpm generate
```

対話形式でアプリ名と kintone アプリ ID を入力。

### 開発サーバー起動

```bash
cd apps/アプリ名
pnpm dev:kintone
```

ファイルを保存すると自動でビルド & kintone にアップロードされる。

### コマンド一覧

| コマンド | 場所 | 説明 |
|----------|------|------|
| `pnpm generate` | ルート | 新しいアプリを作成 |
| `pnpm build` | ルート | 全アプリをビルド |
| `pnpm dev:kintone` | 各アプリ | 開発モード（自動アップロード） |
| `pnpm deploy` | 各アプリ | 開発環境にデプロイ |
| `pnpm release` | 各アプリ | 本番環境にリリース |

## Docker

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

### 開発フロー

1. `develop` から feature ブランチを作成
2. 開発 & コミット
3. `develop` にマージ
4. 本番リリース時は `main` にマージ

### 検証コード

`import.meta.env.DEV` で囲むと本番ビルドで除外される。

```tsx
if (import.meta.env.DEV) {
  console.log('デバッグ:', data)
}
```

## CI/CD

### 自動チェック（全ブランチ）

push すると自動で実行:
- TypeScript 型チェック
- ESLint
- ビルド確認

### 本番リリース（main ブランチ）

`main` に push すると、変更があったアプリだけ自動で本番リリース。

## プロジェクト構成

```
kintone-customizations/
├── apps/                    # アプリケーション
│   ├── quotation-app/       # 見積書アプリ
│   └── quotation-app-dev/   # 見積書アプリ（開発）
├── packages/                # 共通パッケージ
├── templates/               # アプリテンプレート
│   └── app-template/
├── scripts/                 # スクリプト
│   └── generate-app.mjs     # アプリ生成
├── docs/                    # ドキュメント
│   └── docker.md
├── .github/workflows/       # CI/CD
│   ├── ci.yml
│   └── release.yml
├── docker-compose.yml
├── turbo.json
└── pnpm-workspace.yaml
```

## 環境変数

`.env` に以下を設定:

```
KINTONE_BASE_URL=https://xxxxx.cybozu.com
KINTONE_USERNAME=your-username
KINTONE_PASSWORD=your-password
```

## ライセンス

Private
