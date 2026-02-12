# Requirements: AEO/GEO最適化プロジェクト

**Defined:** 2026-02-12
**Core Value:** AI検索で引用される信頼ソースになり、週10件の問い合わせを獲得する

## v1 Requirements

Requirements for initial release (1ヶ月以内). Each maps to roadmap phases.

### Schema Foundation (スキーマ基盤)

- [ ] **SCHEMA-01**: Organization Schemaをサイト全体に実装（会社/個人情報の構造化）
- [ ] **SCHEMA-02**: Person Schemaを著者プロフィールに実装（E-E-AT基盤）
- [ ] **SCHEMA-03**: Article Schemaを全ワークフロー/ケーススタディ記事に実装
- [ ] **SCHEMA-04**: FAQPage Schemaを主要ページ（What I Do, About, Cases）に実装
- [ ] **SCHEMA-05**: HowTo Schemaをワークフロー記事（チュートリアル形式）に実装
- [ ] **SCHEMA-06**: dateModified/datePublishedを全記事に実装（Perplexity対策）
- [ ] **SCHEMA-07**: 日英バイリンガルJSON-LDを実装（言語別構造化データ）

### Content Structure (コンテンツ構造)

- [ ] **STRUCT-01**: 全ページの最初の段落を50語以内の直接回答に最適化
- [ ] **STRUCT-02**: 見出し階層（H1>H2>H3）をサイト全体で統一
- [ ] **STRUCT-03**: 長いパラグラフを2-4行に分割（流暢さ最適化）
- [ ] **STRUCT-04**: 更新日時をUIに表示（視覚的な鮮度シグナル）

### FAQ Content (FAQコンテンツ)

- [ ] **FAQ-01**: What I DoページにFAQセクションを作成（5-7問）
- [ ] **FAQ-02**: AboutページにFAQセクションを作成（3-5問）
- [ ] **FAQ-03**: 各ワークフロー記事にFAQセクションを追加（2-3問ずつ）
- [ ] **FAQ-04**: Processページ（または専用FAQページ）を作成

### Citation & Statistics (引用・統計)

- [ ] **CITE-01**: 既存ワークフロー記事に業界統計/引用を追加（5-7件/1000語）
- [ ] **CITE-02**: ケーススタディに具体的な数値/メトリクスを強化
- [ ] **CITE-03**: 専門家のコメント/引用を主要ページに追加
- [ ] **CITE-04**: 引用の出典明記フォーマットを統一（著者名, 出典, 年）

### E-E-AT Signals (専門性シグナル)

- [ ] **EEAT-01**: 著者プロフィールページを強化（経歴、資格、実績）
- [ ] **EEAT-02**: 外部プロフィールへのsameAsリンク（LinkedIn等）を追加
- [ ] **EEAT-03**: 各記事に著者カード/バイラインを追加

### Conversion Optimization (コンバージョン最適化)

- [ ] **CONV-01**: CTAボタンをSchema.orgでマークアップ
- [ ] **CONV-02**: 問い合わせフォームへの導線を各ページに最適化
- [ ] **CONV-03**: サービス内容の明確な価値提案を50語以内で追加

### Technical Foundation (技術基盤)

- [ ] **TECH-01**: AI検索クローラー（GPTBot, PerplexityBot等）のrobots.txt許可を確認
- [ ] **TECH-02**: sitemap.xmlの生成と最適化
- [ ] **TECH-03**: JSON-LDのGoogle Rich Results Testでの検証

## v2 Requirements

Deferred to future release (v1達成後). Tracked but not in current roadmap.

### Platform Expansion

- **PLAT-01**: YouTube動画コンテンツの作成（Google AI Mode対策）
- **PLAT-02**: LinkedInへの記事ミラーリング
- **PLAT-03**: Knowledge Graph登録（Wikidata）

### Advanced Optimization

- **ADV-01**: プラットフォーム別コンテンツバリエーション
- **ADV-02**: A/Bテストによるコンバージョン最適化
- **ADV-03**: 月次コンテンツ更新カレンダーの運用

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| 有料広告（Google Ads, SNS広告） | オーガニック流入に集中するため |
| SNS運用 | AI検索/SEO最適化に集中するため |
| サイトリデザイン | 既存Mochiテーマを維持 |
| 新規ワークフロー記事の作成 | 既存12記事の最適化を優先 |
| 動画コンテンツ作成 | v2で検討（リソース制約） |
| リアルタイム機能 | 静的コンテンツモデルを維持 |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SCHEMA-01 | Phase 2 | Pending |
| SCHEMA-02 | Phase 2 | Pending |
| SCHEMA-03 | Phase 4 | Pending |
| SCHEMA-04 | Phase 6 | Pending |
| SCHEMA-05 | Phase 8 | Pending |
| SCHEMA-06 | Phase 4 | Pending |
| SCHEMA-07 | Phase 2 | Pending |
| STRUCT-01 | Phase 3 | Pending |
| STRUCT-02 | Phase 3 | Pending |
| STRUCT-03 | Phase 3 | Pending |
| STRUCT-04 | Phase 3 | Pending |
| FAQ-01 | Phase 6 | Pending |
| FAQ-02 | Phase 6 | Pending |
| FAQ-03 | Phase 6 | Pending |
| FAQ-04 | Phase 6 | Pending |
| CITE-01 | Phase 7 | Pending |
| CITE-02 | Phase 7 | Pending |
| CITE-03 | Phase 7 | Pending |
| CITE-04 | Phase 7 | Pending |
| EEAT-01 | Phase 5 | Pending |
| EEAT-02 | Phase 5 | Pending |
| EEAT-03 | Phase 5 | Pending |
| CONV-01 | Phase 9 | Pending |
| CONV-02 | Phase 9 | Pending |
| CONV-03 | Phase 9 | Pending |
| TECH-01 | Phase 1 | Pending |
| TECH-02 | Phase 1 | Pending |
| TECH-03 | Phase 10 | Pending |

**Coverage:**
- v1 requirements: 28 total
- Mapped to phases: 28
- Unmapped: 0

---
*Requirements defined: 2026-02-12*
*Last updated: 2026-02-12 after roadmap creation*
