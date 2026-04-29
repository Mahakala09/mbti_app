import { useEffect, useState, useRef } from 'react'
import { PROFILES, DIM_COLORS } from '../data/profiles'
import type { DimScore, HistoryRecord, Scores } from '../types'

interface Props {
  type: string
  dims: DimScore[]
  scores: Scores
  history: HistoryRecord[]
  onRestart: () => void
  onAddHistory: (rec: HistoryRecord) => void
}

const TRAIT_MAP: Record<string, string> = {
  E:'外向能量', I:'內向能量', S:'實感導向', N:'直覺導向',
  T:'邏輯思考', F:'情感優先', J:'計劃型', P:'彈性型',
}
const DIM_KEYS = ['EI','SN','TF','JP']
const DIM_LABELS = ['能量','資訊','決策','生活']

export function ResultScreen({ type, dims, scores, history, onRestart, onAddHistory }: Props) {
  const profile = PROFILES[type] || { name:'未知', desc:'', careers:[], compat:[], color:'#7F77DD', bg:'#EEEDFE' }
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const savedRef = useRef(false)

  useEffect(() => {
    if (savedRef.current) return
    savedRef.current = true
    const rec: HistoryRecord = { type, name: profile.name, date: new Date().toLocaleDateString('zh-TW'), dims }
    onAddHistory(rec)

    const apiUrl = import.meta.env.VITE_API_URL || '/api'
    fetch(`${apiUrl}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, name: profile.name, scores }),
    })
      .then(r => r.json())
      .then(d => { setAnalysis(d.analysis || profile.desc); setLoading(false) })
      .catch(() => { setAnalysis(profile.desc); setLoading(false) })
  }, [])

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, 600, 220)
    ctx.fillStyle = profile.bg
    ctx.beginPath()
    ;(ctx as any).roundRect?.(0, 0, 600, 220, 16) || ctx.rect(0, 0, 600, 220)
    ctx.fill()
    ctx.fillStyle = profile.color
    ctx.font = '500 48px sans-serif'; ctx.fillText(type, 32, 80)
    ctx.font = '400 18px sans-serif'; ctx.fillText(profile.name, 32, 108)
    ctx.font = '400 13px sans-serif'; ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fillText('MBTI 人格測試', 32, 135)
    const dLabels = ['外向/內向','實感/直覺','思考/情感','判斷/感知']
    dims.forEach((d, i) => {
      const x = 300, y = 28 + i * 47, bw = 260, bh = 10
      ctx.fillStyle = 'rgba(0,0,0,0.1)'
      ;(ctx as any).roundRect?.(x, y, bw, bh, 5) || ctx.rect(x, y, bw, bh)
      ctx.fill()
      ctx.fillStyle = DIM_COLORS[d.key]
      ;(ctx as any).roundRect?.(x, y, Math.round(bw * d.pct / 100), bh, 5) || ctx.rect(x, y, Math.round(bw * d.pct / 100), bh)
      ctx.fill()
      ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.font = '400 12px sans-serif'
      ctx.fillText(dLabels[i], x, y - 6)
      ctx.fillText(`${d.pct}%`, x + bw + 6, y + 9)
    })
  }, [type, dims, profile])

  const copyResult = () => {
    const text = `我的 MBTI 類型是 ${type}（${profile.name}）\n` +
      dims.map(d => `${d.left}/${d.right}: ${d.pct}%`).join('\n') +
      `\n職業建議: ${profile.careers.slice(0, 3).join('、')}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000)
    }).catch(() => {})
  }

  const downloadCard = () => {
    const cv = canvasRef.current; if (!cv) return
    const a = document.createElement('a'); a.download = 'mbti-result.png'; a.href = cv.toDataURL(); a.click()
  }

  const s = (v: string | number) => ({ style: v } as any)
  const card = { background: 'var(--color-background-primary,#fff)', border: '0.5px solid var(--color-border-tertiary,#e5e5e5)', borderRadius: 12, padding: '1rem 1.25rem' }

  return (
    <div style={{ padding: '1.5rem 0' }}>
      <div style={{ display: 'inline-block', fontSize: 30, fontWeight: 500, color: profile.color, background: profile.bg, borderRadius: 12, padding: '8px 22px', marginBottom: 4 }}>{type}</div>
      <div style={{ fontSize: 15, color: 'var(--color-text-secondary,#666)', marginBottom: '1.25rem' }}>{profile.name}</div>

      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: '0.75rem' }}>四個維度分析</div>
      <div style={{ marginBottom: '1.25rem' }}>
        {dims.map(d => (
          <div key={d.key} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--color-text-secondary,#666)', marginBottom: 4 }}>
              <span>{d.left}</span><span>{d.right}</span>
            </div>
            <div style={{ height: 7, background: 'var(--color-background-secondary,#f5f5f5)', borderRadius: 4 }}>
              <div style={{ height: 7, width: `${d.pct}%`, background: DIM_COLORS[d.key], borderRadius: 4, transition: 'width 0.7s ease' }} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary,#999)', marginTop: 2 }}>{d.dom} 傾向 {d.pct}%</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: '0.75rem' }}>核心特質</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 8, marginBottom: '1.25rem' }}>
        {type.split('').map((c, i) => (
          <div key={i} style={{ background: 'var(--color-background-secondary,#f5f5f5)', borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-tertiary,#999)', marginBottom: 3 }}>{DIM_LABELS[DIM_KEYS.findIndex(d => d.includes(c))]}</div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{TRAIT_MAP[c] || c}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: '0.75rem' }}>AI 個人化解讀</div>
      <div style={{ ...card, marginBottom: '1.25rem', fontSize: 14, lineHeight: 1.75, minHeight: 80 }}>
        {loading ? <span style={{ color: 'var(--color-text-tertiary,#999)', fontStyle: 'italic' }}>AI 正在分析中...</span> : analysis}
      </div>

      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: '0.75rem' }}>適合職業方向</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.25rem' }}>
        {profile.careers.map(c => (
          <span key={c} style={{ fontSize: 12, background: '#EEEDFE', color: '#3C3489', borderRadius: 20, padding: '4px 12px' }}>{c}</span>
        ))}
      </div>

      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: '0.75rem' }}>相容人格類型</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {profile.compat.map(t => (
          <span key={t} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 8, border: '0.5px solid var(--color-border-tertiary,#e5e5e5)', color: 'var(--color-text-secondary,#666)' }}>
            {t} · {PROFILES[t]?.name || t}
          </span>
        ))}
      </div>

      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: '0.75rem' }}>分享結果</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button onClick={copyResult} style={{ fontSize: 13, padding: '8px 16px', borderRadius: 8, border: copied ? '0.5px solid #1D9E75' : '0.5px solid var(--color-border-secondary,#ccc)', background: 'none', color: copied ? '#0F6E56' : 'var(--color-text-secondary,#666)', cursor: 'pointer' }}>
          {copied ? '已複製！' : '複製結果文字'}
        </button>
        <button onClick={downloadCard} style={{ fontSize: 13, padding: '8px 16px', borderRadius: 8, border: '0.5px solid var(--color-border-secondary,#ccc)', background: 'none', color: 'var(--color-text-secondary,#666)', cursor: 'pointer' }}>
          下載結果卡片
        </button>
      </div>
      <div style={{ border: '0.5px solid var(--color-border-tertiary,#e5e5e5)', borderRadius: 12, padding: 12, marginBottom: '1.25rem' }}>
        <canvas ref={canvasRef} width={600} height={220} style={{ maxWidth: '100%' }} />
      </div>

      <div style={{ height: '0.5px', background: 'var(--color-border-tertiary,#e5e5e5)', margin: '1.25rem 0' }} />
      <div style={{ fontSize: 12, color: 'var(--color-text-tertiary,#999)', letterSpacing: '0.06em', marginBottom: 8 }}>歷史紀錄</div>
      {history.length === 0
        ? <div style={{ fontSize: 13, color: 'var(--color-text-tertiary,#999)' }}>尚無紀錄</div>
        : history.map((h, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', border: '0.5px solid var(--color-border-tertiary,#e5e5e5)', borderRadius: 8, marginBottom: 7, background: 'var(--color-background-primary,#fff)' }}>
            <div>
              <span style={{ fontWeight: 500, fontSize: 13, color: PROFILES[h.type]?.color || '#3C3489' }}>{h.type}</span>
              <span style={{ fontSize: 12, color: 'var(--color-text-secondary,#666)', marginLeft: 6 }}>· {h.name}</span>
            </div>
            <span style={{ fontSize: 12, color: 'var(--color-text-tertiary,#999)' }}>{h.date}</span>
          </div>
        ))
      }

      <button onClick={onRestart} style={{ marginTop: '1rem', background: 'none', border: '0.5px solid var(--color-border-secondary,#ccc)', borderRadius: 8, padding: '8px 16px', color: 'var(--color-text-secondary,#666)', fontSize: 13, cursor: 'pointer' }}>
        重新測試
      </button>
    </div>
  )
}
