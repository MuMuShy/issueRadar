from fastapi import FastAPI, Query, Body
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI

# 載入 .env
load_dotenv()
client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
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
    # 呼叫 GPT 解析描述
    prompt = f"""
你是一個 GitHub issue 搜尋助手。請根據使用者的描述，幫我提取出最適合的搜尋關鍵字（q）、issue 標籤（label，可選）、程式語言（lang，可選），並用 JSON 格式回覆，例如：{{"q": "login error", "label": "bug", "lang": "python"}}。

使用者描述：{desc}
"""
    try:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": "你是一個 GitHub issue 搜尋助手。"},
                        {"role": "user", "content": prompt}]
        )
        content = completion.choices[0].message.content
        import json
        result = json.loads(content)
        query = result.get("q", desc)
        # label 可能是字串或陣列，統一轉成陣列
        label = result.get("label", "")
        if isinstance(label, str):
            labels = [label] if label else []
        elif isinstance(label, list):
            labels = label
        else:
            labels = []
        language = result.get("lang", "")
    except Exception as e:
        query = desc
        labels = []
        language = ""
    return {"query": query, "labels": labels, "language": language}
