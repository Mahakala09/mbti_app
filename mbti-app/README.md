# MBTI 人格測試

React + TypeScript + Express，透過 Docker Compose 一鍵啟動。

## 架構

```
nginx (port 80)
  ├── / → frontend (Vite + React, port 5173)
  └── /api/ → backend (Express, port 3001)
```

## 快速啟動

```bash
# 1. 複製環境變數
cp .env.example .env

# 2. 填入 Anthropic API Key
#    編輯 .env，填入你的 key
vi .env

# 3. 啟動
docker compose up -d

# 4. 開啟瀏覽器
open http://localhost
```

## 管理指令

```bash
# 查看 log
docker compose logs -f

# 重啟特定服務
docker compose restart backend

# 停止
docker compose down

# 重新 build（修改程式碼後）
docker compose up -d --build
```

## 環境變數

| 變數 | 說明 |
|------|------|
| `ANTHROPIC_API_KEY` | Anthropic API Key（必填） |

## 目錄結構

```
mbti-app/
├── docker-compose.yml
├── .env.example
├── nginx/
│   └── nginx.conf
├── frontend/          # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── data/        # 60 題題庫 + 16 種人格資料
│   │   ├── hooks/       # useQuiz 狀態管理
│   │   └── types/
│   └── Dockerfile
└── backend/           # Express + Anthropic SDK
    ├── src/index.js
    └── Dockerfile
```
