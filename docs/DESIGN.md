# 設計書 - Portfolio Website

## 1. システムアーキテクチャ

### 1.1 全体構成図

```
┌─────────────────────────────────────────────────────────────┐
│                        Client                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Next.js Application                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │   │
│  │  │   Pages     │  │ Components  │  │    i18n     │ │   │
│  │  │ (App Router)│  │  (React)    │  │ (辞書管理)  │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘ │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vercel Platform                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │     CDN     │  │  Edge       │  │  Serverless         │ │
│  │  (静的配信) │  │  Functions  │  │  Functions          │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │ Supabase │   │  Resend  │   │ External │
        │   (DB)   │   │  (Mail)  │   │   APIs   │
        └──────────┘   └──────────┘   └──────────┘
```

### 1.2 技術スタック

| レイヤー | 技術 | バージョン | 用途 |
|----------|------|------------|------|
| フレームワーク | Next.js | 14.2.0 | SSG/SSR対応のReactフレームワーク |
| UI | React | 18.2.0 | コンポーネントベースUI |
| 言語 | TypeScript | 5.3.0 | 型安全な開発 |
| スタイリング | Tailwind CSS | 3.4.17 | ユーティリティファーストCSS |
| アニメーション | Framer Motion | 12.27.5 | 高度なアニメーション |
| アイコン | Lucide React | 0.562.0 | SVGアイコンライブラリ |
| バックエンド | Supabase | - | BaaS（認証・DB・ストレージ） |
| メール | Resend | - | メール配信API |
| ホスティング | Vercel | - | デプロイ・CDN |

---

## 2. ディレクトリ構成

```
Portfolio/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # ルートレイアウト
│   │   ├── page.tsx                  # リダイレクト処理
│   │   ├── globals.css               # グローバルスタイル
│   │   └── [locale]/                 # 動的ロケールルート
│   │       ├── layout.tsx            # ロケール別レイアウト
│   │       ├── page.tsx              # ホームページ
│   │       ├── about/
│   │       ├── what-i-do/
│   │       ├── cases/
│   │       ├── process/
│   │       ├── contact/
│   │       └── privacy/
│   │
│   ├── components/                   # 共通コンポーネント
│   │   ├── Header.tsx                # ヘッダー・ナビゲーション
│   │   ├── Footer.tsx                # フッター
│   │   └── Layout.tsx                # ページレイアウト
│   │
│   ├── i18n/                         # 国際化
│   │   ├── config.ts                 # ロケール設定
│   │   ├── getDictionary.ts          # 辞書ローダー
│   │   └── translations/
│   │       ├── en.ts                 # 英語翻訳
│   │       └── ja.ts                 # 日本語翻訳
│   │
│   └── middleware.ts                 # ロケールルーティング
│
├── public/                           # 静的アセット
├── docs/                             # ドキュメント
├── Mochi-Glass/                      # デザインシステム参照
└── 設定ファイル群
```

---

## 3. コンポーネント設計

### 3.1 コンポーネント階層

```
App
├── RootLayout (フォント設定)
│   └── LocaleLayout (ロケール管理)
│       └── Layout
│           ├── Header
│           │   ├── Navigation
│           │   ├── LanguageSwitcher
│           │   └── MobileMenu
│           ├── Main (各ページコンテンツ)
│           └── Footer
```

### 3.2 主要コンポーネント仕様

#### Header コンポーネント
```typescript
interface HeaderProps {
  locale: string;
  dictionary: Dictionary;
}

// 機能:
// - 固定位置ナビゲーション
// - スクロール時の背景変化
// - デスクトップ/モバイル対応
// - 言語切り替え
// - 現在ページのハイライト
```

#### Layout コンポーネント
```typescript
interface LayoutProps {
  children: React.ReactNode;
  locale: string;
  dictionary: Dictionary;
}

// 機能:
// - Header/Footer のラッピング
// - 共通レイアウト構造の提供
```

### 3.3 ページコンポーネント分類

| 種類 | 例 | 特徴 |
|------|-----|------|
| Server Component | Home, About, What I Do | 静的生成、SEO最適化 |
| Client Component | Contact Form, Cases | インタラクティブ要素 |
| Hybrid | Contact Page | Server + Client組み合わせ |

---

## 4. 国際化（i18n）設計

### 4.1 対応ロケール

| ロケール | 言語 | デフォルト |
|----------|------|-----------|
| `en` | 英語 | ○ |
| `ja` | 日本語 | |

### 4.2 ルーティング

```
/              → リダイレクト → /en
/en            → 英語ホーム
/ja            → 日本語ホーム
/en/about      → 英語アバウト
/ja/about      → 日本語アバウト
```

### 4.3 辞書構造

```typescript
interface Dictionary {
  nav: {
    home: string;
    about: string;
    whatIDo: string;
    cases: string;
    process: string;
    contact: string;
  };
  home: {
    hero: { title: string; subtitle: string; cta: string; };
    // ...
  };
  // ページごとのセクション
}
```

### 4.4 ミドルウェア処理フロー

```
リクエスト
    │
    ▼
ロケール検出
    │
    ├─ パスにロケールあり → そのまま処理
    │
    └─ パスにロケールなし
        │
        ├─ Accept-Language確認
        │
        └─ デフォルト(en)にリダイレクト
```

---

## 5. デザインシステム（Mochi-Glass）

### 5.1 カラーパレット

```css
:root {
  /* 背景 */
  --background: #F3F1E9;      /* Warm Sand */

  /* 前景 */
  --foreground: #595046;      /* Cocoa Gray */

  /* プライマリ */
  --primary: #FFBFA8;         /* Soft Coral */
  --primary-foreground: #595046;

  /* セカンダリ */
  --secondary: #EAE8E0;       /* Darker Sand */

  /* アクセント */
  --accent: #FFE4DC;

  /* ボーダー */
  --border: rgba(89, 80, 70, 0.1);
}
```

### 5.2 タイポグラフィ

| 用途 | フォント | ウェイト |
|------|----------|----------|
| 見出し | Zen Maru Gothic | 500-700 |
| 本文 | Nunito | 400-600 |

### 5.3 Mochi Card スタイル

```css
.mochi-card {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(24px);
  border-radius: 2rem;
  box-shadow:
    /* 外側の影（深さ） */
    8px 8px 32px rgba(89, 80, 70, 0.12),
    /* 内側のハイライト */
    inset 2px 2px 4px rgba(255, 255, 255, 0.8);
}
```

### 5.4 アニメーション定義

```typescript
// Tailwind設定
animation: {
  'float': 'float 6s ease-in-out infinite',
  'slide-in': 'slideIn 0.5s ease-out',
  'fade-in': 'fadeIn 0.3s ease-out',
}

keyframes: {
  float: {
    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
    '50%': { transform: 'translateY(-10px) rotate(2deg)' },
  },
}
```

---

## 6. データフロー

### 6.1 問い合わせフォーム

```
ユーザー入力
    │
    ▼
Client Component (バリデーション)
    │
    ▼
Server Action / API Route
    │
    ├─ Resend API → メール送信
    │
    └─ (将来) Supabase → データ保存
    │
    ▼
レスポンス → UI更新
```

### 6.2 ページレンダリング

```
ビルド時 (SSG)
    │
    ├─ generateStaticParams() → 全ロケールのパス生成
    │
    ├─ 各ページコンポーネント → HTMLプリレンダリング
    │
    └─ 静的ファイル生成

リクエスト時
    │
    ├─ Middleware → ロケール処理
    │
    └─ CDNから静的ファイル配信
```

---

## 7. セキュリティ設計

### 7.1 環境変数管理

```env
# .env.local (非公開)
NEXT_PUBLIC_SUPABASE_URL=xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
RESEND_API_KEY=xxx
CONTACT_EMAIL=xxx
```

### 7.2 セキュリティ対策

| 脅威 | 対策 |
|------|------|
| XSS | Reactの自動エスケープ、dangerouslySetInnerHTML不使用 |
| CSRF | SameSite Cookie、Origin検証 |
| インジェクション | パラメータバインディング（Supabase） |
| 情報漏洩 | 環境変数による機密情報管理 |

---

## 8. パフォーマンス最適化

### 8.1 適用済み最適化

| 項目 | 実装 |
|------|------|
| 画像最適化 | Next.js Image（将来） |
| フォント最適化 | next/font（Google Fonts最適化） |
| コード分割 | App Router自動分割 |
| 静的生成 | SSGによるプリレンダリング |
| CDN配信 | Vercel Edge Network |

### 8.2 バンドルサイズ管理

```typescript
// Dynamic Import例
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
});
```

---

## 9. デプロイメント

### 9.1 デプロイフロー

```
Git Push (main)
    │
    ▼
Vercel自動検知
    │
    ▼
ビルド (next build)
    │
    ▼
静的ファイル生成
    │
    ▼
Edge Networkにデプロイ
    │
    ▼
本番環境更新
```

### 9.2 環境構成

| 環境 | URL | 用途 |
|------|-----|------|
| Production | (Vercel自動) | 本番 |
| Preview | PRごとに自動生成 | レビュー |
| Local | localhost:3000 | 開発 |

---

## 10. 拡張計画

### 10.1 将来の機能拡張

| 機能 | 優先度 | 技術 |
|------|--------|------|
| ブログ | 中 | MDX + Contentlayer |
| 予約システム | 中 | Calendly埋め込み / Supabase |
| 分析 | 低 | Vercel Analytics / Plausible |
| CMS連携 | 低 | Sanity / Contentful |

### 10.2 Supabase活用計画

```
現在: 設定のみ（将来の拡張用）

将来:
├── 問い合わせデータ保存
├── ブログ記事管理
├── ユーザー認証（会員機能）
└── ファイルストレージ
```

---

## 11. 改訂履歴

| バージョン | 日付 | 変更内容 | 担当者 |
|-----------|------|----------|--------|
| 1.0 | 2026-02-03 | 初版作成 | - |
