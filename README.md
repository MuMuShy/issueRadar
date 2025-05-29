# 🚀 IssueRadar

> 用 AI 搜尋 GitHub issue，快速找到你能貢獻的開源專案！  
> Search GitHub issues with AI and natural language. Instantly find open source issues you can contribute to!

[🌐 正式站 Demo | Live Demo](https://issueradar.ai)

![GitHub stars](https://img.shields.io/github/stars/MuMuShy/issueRadar?style=social)
![GitHub forks](https://img.shields.io/github/forks/MuMuShy/issueRadar?style=social)
![License](https://img.shields.io/github/license/MuMuShy/issueRadar)

---

## 🧩 專案簡介 | Project Introduction

**IssueRadar** 是一個結合 AI（GPT-3.5）與 GitHub API 的開源專案，讓你可以用自然語言描述想找的 issue，AI 會自動解析並推薦最適合你貢獻的 GitHub issue。  
**IssueRadar** is an open-source project combining AI (GPT-3.5) and the GitHub API. You can search for issues with natural language, and AI will recommend the best GitHub issues for you to contribute to.

---

## 🚀 功能特色 | Features

- 🧠 **AI 自然語言搜尋**：用中文或英文描述需求，AI 解析並推薦 issue  
  **AI-powered natural language search:** Describe your needs in Chinese or English, and AI will recommend issues for you.
- 🔍 **GitHub 即時搜尋**：串接 GitHub API，搜尋全站公開 issue  
  **Real-time GitHub search:** Integrates with the GitHub API to search all public issues site-wide.
- 🏷️ **AI 標籤/語言推薦**：自動推薦相關標籤與程式語言  
  **AI label/language suggestions:** Automatically recommends relevant labels and programming languages.
- ⭐ **一鍵前往**：快速打開 issue 頁面  
  **One-click navigation:** Quickly open the issue page.
- 📌 **收藏追蹤**：將有興趣的 issue 加入收藏清單，方便追蹤  
  **Bookmark/follow:** Add interesting issues to your favorites for easy tracking.
- 🛠️ **可擴充**：未來將支援排行榜、社群互動等功能  
  **Extensible:** More features such as leaderboards and community interaction coming soon!

---

## 🛠️ 技術棧 | Tech Stack

- **前端 | Frontend**：Angular 19 + Angular Material + RxJS
- **後端 | Backend**：FastAPI + OpenAI + GitHub API

---

## ⚡ 快速開始 | Quick Start

### 1. Clone 專案 | Clone the repo

```bash
git clone https://github.com/MuMuShy/issueRadar.git
cd issueRadar
```

### 2. 後端啟動 | Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# 編輯 .env，填入 OPENAI_API_KEY
# Edit .env and fill in your OPENAI_API_KEY
uvicorn main:app --reload
```

### 3. 前端啟動 | Frontend Setup

```bash
cd ../frontend
npm install
npm start
```
- 前端預設在 http://localhost:4200 | Frontend default: http://localhost:4200
- 後端預設在 http://localhost:8000 | Backend default: http://localhost:8000

---

## 🧩 常見問題 | FAQ

- FastAPI 與 openai/uvicorn 環境需一致  
  Python version, openai, and uvicorn must match for FastAPI
- Render root directory 要設對  
  Ensure correct root directory setting on Render
- Angular 19 build 指令不支援 `--prod`  
  Angular 19 build does not support `--prod`
- API CORS 請確認 allow_origins  
  For CORS issues, check allow_origins setting

---

## 🔮 未來規劃 | Roadmap

- 收藏/追蹤 issue、搜尋歷史、排行榜、社群互動  
  Bookmark/follow issues, search history, leaderboard, community interaction
- 分享、貢獻教學、AI 智能推薦更多維度  
  Sharing, contribution guides, smarter AI recommendations
- 多語言支援、專案徽章、成就獎勵  
  Multi-language support, project badges, achievement rewards

---

## 🤝 貢獻指南 | Contributing

歡迎 PR、issue、討論！有想法或建議、發現 bug 都歡迎提報，一起讓 IssueRadar 更強大！  
PRs, issues, and discussions are welcome! Share your ideas, suggestions, or report bugs — let’s make IssueRadar even better together!

---

## 📄 License

MIT
