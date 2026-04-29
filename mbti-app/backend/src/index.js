import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'

const app = express()
const port = process.env.PORT || 3001
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => res.json({ ok: true }))

app.post('/analyze', async (req, res) => {
  const { type, name, scores } = req.body
  if (!type || !name || !scores) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  try {
    const msg = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: `用戶完成 60 題 MBTI 測試，結果是 ${type}（${name}）。四個維度分數：E${scores.E}/I${scores.I}、S${scores.S}/N${scores.N}、T${scores.T}/F${scores.F}、J${scores.J}/P${scores.P}。請用繁體中文寫一段 100-120 字的個性化分析，包含：1) 核心特質描述 2) 在人際關係上的特點 3) 一個成長建議。語氣友善且有洞察力，不要標題或條列，直接輸出段落文字。`
      }]
    })
    const text = msg.content.map(c => c.text || '').join('')
    res.json({ analysis: text })
  } catch (err) {
    console.error('Anthropic error:', err.message)
    res.status(500).json({ error: 'AI analysis failed' })
  }
})

app.listen(port, () => console.log(`Backend running on :${port}`))
