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
- 🏷️ **AI 標籤/語言推薦**：自動推薦相關標籤與程式語言
- 🌏 **中英文介面**：支援語言切換
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

## 🌐 部署建議 | Deployment

- **後端**：推薦 Render.com、Railway、GCP Cloud Run
- **前端**：推薦 Vercel、Netlify、Cloudflare Pages
- 詳細部署教學請見 `/docs/deploy.md`（可自行新增）

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
