# Gold City Birthday Archive

ゴールドシチー生誕祭向けの投稿を、投稿者単位で管理しながら閲覧できる Astro 製の完全静的サイトです。GitHub Pages の project site でそのまま公開できるように、`site` と `base` を考慮した構成にしています。

## 特徴

- Astro + TypeScript + content collections を使用
- 完全静的出力なので GitHub Pages で公開可能
- 投稿者プロフィールを `src/content/authors/` に、投稿本文を `src/content/posts/<authorId>/` に分離
- スマートフォン最優先の読書 UI
- 白系背景にゴールドとブルーを差した、軽量で上品なカードレイアウト

## ローカル起動方法

1. Node.js 20 以上を用意します。
2. 依存関係をインストールします。

```bash
npm install
```

初回インストール後に生成される `package-lock.json` は、そのままコミットしておくと GitHub Actions 側の依存解決が安定します。

3. 開発サーバーを起動します。

```bash
npm run dev
```

4. `http://localhost:4321/goldcity-birthday-test/` を開きます。

補足:
ローカルでも GitHub Pages の project site を想定して `base` が有効になるため、トップ URL は `/goldcity-birthday-test/` です。必要なら `BASE_PATH=/` を一時的に与えて開発しても構いません。

## GitHub Pages 公開方法

1. このリポジトリを GitHub に push します。
2. GitHub の `Settings > Pages` で `Source` を `GitHub Actions` にします。
3. `main` ブランチへ push すると、`.github/workflows/deploy.yml` が自動でビルドと公開を行います。

ワークフローでは以下を自動で設定しています。

- `SITE_URL`: `https://<repository_owner>.github.io`
- `BASE_PATH`: `/<repository_name>`

補足:
ユーザーサイトではなく project site 前提です。もし `username.github.io` 形式のユーザーサイトとして公開する場合は、`BASE_PATH` を `/` に変更してください。

## ディレクトリ構成

```text
.
├─ public/
│  └─ images/
│     └─ authors/
│        └─ <authorId>/
│           ├─ avatar.webp
│           └─ <slug>/
│              └─ ...
├─ src/
│  ├─ components/
│  ├─ content/
│  │  ├─ authors/
│  │  │  └─ <authorId>.json
│  │  └─ posts/
│  │     └─ <authorId>/
│  │        └─ <slug>.md
│  ├─ layouts/
│  └─ pages/
└─ .github/
   └─ workflows/
```

## 新しい投稿者の追加方法

1. `src/content/authors/<authorId>.json` を作成します。
2. 画像を `public/images/authors/<authorId>/avatar.webp` に配置します。
3. 必要なら `sortOrder` を調整して一覧表示順を決めます。

著者 JSON の例:

```json
{
  "name": "投稿者名",
  "reading": "よみがな",
  "tagline": "短い紹介文",
  "bio": "一覧や著者ページで表示する説明文",
  "avatar": "/images/authors/<authorId>/avatar.webp",
  "sortOrder": 3
}
```

## 新しい投稿の追加方法

1. `src/content/posts/<authorId>/<slug>.md` を作成します。
2. frontmatter にタイトル、要約、日付、ギャラリー情報を記入します。
3. 本文は Markdown で記述します。
4. 関連画像を `public/images/authors/<authorId>/<slug>/` に配置します。

投稿 Markdown の例:

```md
---
title: 投稿タイトル
summary: 一覧で表示する要約
publishedAt: 2026-03-28
updatedAt: 2026-03-30
gallery:
  - src: /images/authors/<authorId>/<slug>/01.webp
    alt: 画像の説明
    caption: 任意のキャプション
---

ここに本文を書きます。
```

## 画像配置ルール

- 投稿者アイコンは必ず `public/images/authors/<authorId>/avatar.webp`
- 投稿内の画像は `public/images/authors/<authorId>/<slug>/` にまとめる
- Markdown や JSON に書くパスは、必ず `/images/...` から始める
- 画像形式は軽量化のため `webp` を推奨
- モバイルで見やすいよう、横長画像でも 1200px 前後を目安にすると扱いやすい

## 命名ルール

- `authorId`: 英小文字 + ハイフン
  - 例: `minase-aya`
- `slug`: 英小文字 + ハイフン
  - 例: `morning-glow`
- 画像ファイル名:
  - 投稿ギャラリーは `01.webp`, `02.webp` のように連番推奨
  - アバターは固定で `avatar.webp`

## 補足メモ

- 投稿者 ID と投稿ディレクトリ名を一致させることで、管理単位がぶれません。
- `src/content.config.ts` で content collections の型定義をまとめているため、データ追加時に構造の揺れを検知しやすくなっています。
- `src/lib/paths.ts` で `base` を考慮した URL 生成を集約しているため、project site 配下でもリンク切れしにくい構成です。
