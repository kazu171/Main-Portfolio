# AEO/GEO最適化プロジェクト — 週10件の問い合わせ獲得

## What This Is

既存のポートフォリオサイト（Next.js、12ワークフロー記事+3ケーススタディ）をAI検索（ChatGPT, Perplexity, Google AI Overviews）および従来SEO向けに最適化し、一人法人/個人事業主からの問い合わせを週10件獲得するプロジェクト。

## Core Value

**AI検索で「n8n 自動化 一人法人」「マーケティング自動化 個人事業主」などのクエリに対して、信頼できる回答ソースとして引用される。**

問い合わせ0→週10件という10倍成長を1ヶ月以内に達成する。

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] JSON-LDスキーママークアップ（Person, Service, Article, FAQPage, HowTo）
- [ ] FAQコンテンツの作成と構造化
- [ ] 既存コンテンツへのGEOテクニック適用（引用、統計、専門家コメント）
- [ ] プラットフォーム別最適化（ChatGPT, Perplexity, Google AI向け）
- [ ] 新規AEO最適化コンテンツの作成
- [ ] コンタクトページのコンバージョン最適化

### Out of Scope

- 有料広告（Google Ads, SNS広告）— オーガニック流入に集中
- SNS運用 — AI検索/SEO最適化に集中
- サイトリデザイン — 既存デザイン（Mochi theme）を維持

## Context

### 現状分析（GEOテクニック診断）

| テクニック | 現状スコア | 改善余地 |
|-----------|-----------|----------|
| Cite Sources（引用追加） | 0/10 | 🔴 最高優先 |
| Statistics Addition（統計追加） | 3/10 | 🔴 最高優先 |
| Quotation Addition（専門家引用） | 0/10 | 🔴 最高優先 |
| Structured Data（構造化データ） | 1/10 | 🔴 最高優先 |
| FAQ Format | 0/10 | 🔴 最高優先 |

**総合スコア: 19/70 (27%)** → AI検索可視性向上余地 +40-60%

### 技術スタック

- Next.js 16.1.6 (App Router) + Turbopack
- next-intl（en/ja バイリンガル）
- 静的TypeScriptデータ（lib/content/）
- Mochi claymorphic design system

### コンテンツ資産

- 12 Workflow記事（n8n自動化ソリューション）
- 3 Case Study記事（1件有効：sato-wellness-shop）
- 主要ページ：Home, About, What I Do, Cases, Process, Contact

## Constraints

- **Timeline**: 1ヶ月以内に週10件問い合わせ達成
- **Tech stack**: Next.js App Router維持、静的コンテンツモデル維持
- **Design**: Mochi theme維持
- **Content**: 日英バイリンガル対応必須

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| AI検索最適化を最優先 | 競合が少なく先行者優位が大きい | — Pending |
| 既存コンテンツ改善から着手 | 新規作成より低コストで即効性 | — Pending |
| FAQPage schemaを重点投資 | AI Overviewsに3.2倍表示されやすい | — Pending |

---
*Last updated: 2026-02-12 after initialization*
