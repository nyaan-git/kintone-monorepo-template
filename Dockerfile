FROM node:20-slim

# pnpm を有効化
RUN corepack enable && corepack prepare pnpm@latest --activate

# 作業ディレクトリ
WORKDIR /app

# ソースをコピー
COPY . .

# 依存関係インストール
RUN pnpm install

# ポート公開（Vite のデフォルト）
EXPOSE 5173

# デフォルトコマンド
CMD ["pnpm", "dev"]
