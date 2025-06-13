from fastapi import FastAPI, Query, Body
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI
from fastapi.responses import HTMLResponse

# 載入 .env
load_dotenv()
AI_PROVIDER = os.environ.get("AI_PROVIDER", "openai")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

if AI_PROVIDER == "gemini":
    client = OpenAI(
        api_key=GEMINI_API_KEY,
        base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
    )
else:
    client = OpenAI(
        api_key=OPENAI_API_KEY,
    )

app = FastAPI()

# 讀取前端網域，預設允許 localhost 及正式網域
frontend_origins = os.environ.get("FRONTEND_ORIGIN", "http://localhost:4200").split(",")

# CORS 設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=frontend_origins,  # 從 .env 讀取
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 搜尋 GitHub issue
@app.get("/api/search")
def search_github_issues(
    q: str = Query(..., description="關鍵字"),
    label: str = Query("", description="issue 標籤"),
    lang: str = Query("", description="程式語言")
):
    query_parts = [f"{q}", "is:issue", "is:open"]
    if label:
        query_parts.append(f"label:{label}")
    if lang:
        query_parts.append(f"language:{lang}")
    full_query = "+".join(query_parts)

    url = "https://api.github.com/search/issues"
    headers = {"Accept": "application/vnd.github.v3+json"}
    params = {"q": full_query, "per_page": 20}

    response = requests.get(url, headers=headers, params=params)
    return response.json()

# 新增：自然語言查詢模型
class NLQuery(BaseModel):
    description: str

@app.post("/api/nl_search")
def nl_search(query: NLQuery):
    desc = query.description
    prompt = f"""
你是一個 GitHub issue 搜尋助手。請根據使用者的描述，幫我提取出最適合的搜尋關鍵字（q）、issue 標籤（label，可選）、程式語言（lang，可選），並用 JSON 格式回覆，例如：{{"q": "login error", "label": "bug", "lang": "python"}}。

使用者描述：{desc}
"""
    try:
        completion = client.chat.completions.create(
            model=("gemini-2.0-flash" if AI_PROVIDER == "gemini" else "gpt-3.5-turbo"),
            messages=[{"role": "system", "content": "你是一個 GitHub issue 搜尋助手。"},
                      {"role": "user", "content": prompt}]
        )
        content = completion.choices[0].message.content
        import json
        result = json.loads(content)
        query_val = result.get("q", desc)
        label = result.get("label", "")
        if isinstance(label, str):
            labels = [label] if label else []
        elif isinstance(label, list):
            labels = label
        else:
            labels = []
        language = result.get("lang", "")
    except Exception as e:
        query_val = desc
        labels = []
        language = ""
    return {"query": query_val, "labels": labels, "language": language}

# --- 新增：AI 分析 issue ---
class IssueAnalysisRequest(BaseModel):
    title: str
    body: str

class IssueAnalysisResponse(BaseModel):
    suggestion: str

@app.post("/api/analyze-issue", response_model=IssueAnalysisResponse)
def analyze_issue(req: IssueAnalysisRequest):
    prompt = f"""
你是一位資深開源專案貢獻者。請根據以下 GitHub issue 的標題與內容，
用 3-5 點條列、每點不超過 30 字，簡短說明修復或貢獻的重點步驟或建議。
只列重點，不要贅述。

---
Issue 標題：{req.title}
Issue 內容：{req.body}
"""
    try:
        completion = client.chat.completions.create(
            model=("gemini-2.0-flash" if AI_PROVIDER == "gemini" else "gpt-3.5-turbo"),
            messages=[
                {"role": "system", "content": "你是一位資深開源專案貢獻者。"},
                {"role": "user", "content": prompt}
            ]
        )
        suggestion = completion.choices[0].message.content.strip()
    except Exception as e:
        suggestion = f"AI 分析失敗：{str(e)}"
    return IssueAnalysisResponse(suggestion=suggestion)

@app.get("/health", response_class=HTMLResponse)
def health_check():
    return """
    <html>
      <head><title>IssueRadar Health</title></head>
      <body>
        <p>Status: OK</p>
      </body>
    </html>
    """
