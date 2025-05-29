# IssueRadar

> 用 AI 自然語言搜尋 GitHub issue，快速找到你能貢獻的開源專案！
> 
> Search GitHub issues with AI and natural language. Instantly find open source issues you can contribute to!

---

## 🧩 專案簡介 | Project Introduction

**IssueRadar** 是一個結合 AI（GPT-3.5）與 GitHub API 的開源專案，讓你可以用自然語言描述想找的 issue，AI 會自動解析並推薦最適合你貢獻的 GitHub issue。

**IssueRadar** is an open-source project combining AI (GPT-3.5) and the GitHub API. You can search for issues with natural language, and AI will recommend the best GitHub issues for you to contribute to.

---

## 🚀 功能特色 | Features

- 🧠 **AI 自然語言搜尋**：用中文或英文描述需求，AI 解析並推薦 issue
- 🔍 **GitHub 即時搜尋**：串接 GitHub API，搜尋全站公開 issue
- 🏷️ **AI 標籤/語言推薦**：自動推薦相關標籤與程式語言，AI 會回傳 `{query, labels, language}` 結構，前端可直接帶入搜尋
- 🌏 **中英文介面**：所有主要文案、UI 皆支援語言自動切換
- 💡 **現代化 UI/UX**：搜尋表單、AI 標籤推薦、語言切換、贊助按鈕等皆有設計與優化，支援響應式、主題色、圓角、陰影
- ⭐ **一鍵前往/收藏/貢獻**（可擴充）
- ☕ **贊助我們**：支援 Buy Me a Coffee

---

## 🛠️ 技術棧 | Tech Stack

- **前端**：Angular 19 + Angular Material + RxJS
- **後端**：FastAPI + OpenAI + GitHub API
- **部署建議**：Render.com（後端）、Vercel/Netlify/Cloudflare Pages（前端）

---

## ⚡ 快速開始 | Quick Start

### 1. Clone 專案 | Clone the repo

```bash
git clone https://github.com/yourname/issueRadar.git
cd issueRadar
```

### 2. 後端啟動 | Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
# 複製 .env 並填入你的 OpenAI Key
cp .env.example .env
# 編輯 .env，填入 OPENAI_API_KEY
uvicorn main:app --reload
```

### 3. 前端啟動 | Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

- 前端預設在 http://localhost:4200
- 後端預設在 http://localhost:8000

---

## 🌐 部署與環境變數 | Deployment & Environment

- **後端**：推薦 Render.com、Railway、GCP Cloud Run
  - Render 部署 root directory 請設為 backend，否則 API 會 404
  - .env 管理 OpenAI API Key，建議 production 僅允許可信來源
- **前端**：推薦 Vercel、Netlify、Cloudflare Pages
  - build output 設為 `dist/issueRadar`（或專案資料夾名）
  - Cloudflare Pages 若遇 Node 版本過舊，請加 `.node-version`（如 18.19.1）
  - Angular 19 build 指令只需 `ng build`，不再支援 `--prod`
  - API URL 已用 Angular 環境變數（`environment.ts`/`environment.prod.ts`），本地與 production 可自動切換

---

## 🧩 常見問題與解決 | FAQ & Troubleshooting

- FastAPI 啟動時 Python 版本、openai 套件、uvicorn 環境需一致
- Render 部署 root directory 要設對，否則 API 404
- Cloudflare Pages 404 通常是 build 失敗或 output directory 設錯
- Angular 19 build 指令不再支援 `--prod`，需用新版語法
- API CORS 問題請確認 allow_origins 設定
- 前端 send 按鈕設計建議用原生 button + mat-icon，自訂 CSS

---

## 🔮 未來規劃/功能建議 | Roadmap & Ideas

- 收藏/追蹤 issue、搜尋歷史、排行榜、社群互動
- 分享、貢獻教學、AI 智能推薦更多維度
- 支援更多贊助方式（GitHub Sponsors...）

---

## ☕ 贊助我們 | Sponsor Us

如果你喜歡這個專案，歡迎贊助支持！

[![Buy Me a Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://www.buymeacoffee.com/你的帳號)

---

## 🤝 貢獻指南 | Contributing

歡迎 PR、issue、討論！

---

## 📄 License

MIT
