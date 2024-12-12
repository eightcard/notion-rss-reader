## About Notion RSS Reader

OpenTelemetryライブラリの更新確認の自動化で利用しています。

https://www.notion.so/3c246443a9044eeebe25ba9b6ecaf68f?pvs=4#15aee7728c57803c8467ca0ba7074590

## Getting Started

- リポジトリシークレットの設定

1. Get `NOTION_FEEDER_DATABASE_ID` & `NOTION_READER_DATABASE_ID`

   URL contains DATABASE_ID.

   URLはDATABASE_IDを含んでいます

   Example: `https://notion.site/${DATABASE_ID}?v=********`

2. Get `NOTION_KEY`(Internal Integration Token)

   Corpsに依頼して発行してもらう。

3. Add `NOTION_FEEDER_DATABASE_ID`, `NOTION_READER_DATABASE_ID`, and
   `NOTION_KEY` to GitHub Actions Secrets.

   GitHub Actions Secretsに、NOTION_FEEDER_DATABASE_ID, NOTION_READER_DATABASE_ID, NOTION_KEYを追加してください。

   `Settings` → `Actions`→ `Repository Secrets`
