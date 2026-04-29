import type { HistoryRecord } from '../types'
import { PROFILES } from '../data/profiles'

interface Props {
  history: HistoryRecord[]
  onStart: () => void
}

export function StartScreen({ history, onStart }: Props) {
  return (
    <div style={{ padding: '2rem 0', textAlign: 'center' }}>
      <div style={{ display: 'inline-block', fontSize: 18, fontWeight: 500, color: '#3C3489', background: '#EEEDFE', borderRadius: 12, padding: '8px 22px', marginBottom: '1rem' }}>MBTI</div>
      <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: '0.5rem' }}>人格類型測試</h1>
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary, #666)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        60 道題目，覆蓋四個核心維度<br />AI 個性化解讀 · 職業建議 · 相容類型
      </p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
        {['60 題','4 個維度','AI 解讀','歷史紀錄','職業建議','相容類型'].map(t => (
          <span key={t} style={{ fontSize: 12, background: '#EEEDFE', color: '#3C3489', borderRadius: 20, padding: '4px 12px' }}>{t}</span>
        ))}
      </div>
      <button onClick={onStart} style={{ background: '#534AB7', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 36px', fontSize: 15, cursor: 'pointer' }}>
        開始測試
      </button>

      {history.length > 0 && (
        <div style={{ marginTop: '2rem', textAlign: 'left' }}>
          <div style={{ height: '0.5px', background: 'var(--color-border-tertiary, #e5e5e5)', margin: '1.5rem 0' }} />
          <div style={{ fontSize: 12, color: 'var(--color-text-tertiary, #999)', letterSpacing: '0.06em', marginBottom: 8 }}>歷史紀錄</div>
          {history.slice(0, 3).map((h, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', border: '0.5px solid var(--color-border-tertiary, #e5e5e5)', borderRadius: 8, marginBottom: 7, background: 'var(--color-background-primary, #fff)' }}>
              <div>
                <span style={{ fontWeight: 500, fontSize: 13, color: PROFILES[h.type]?.color || '#3C3489' }}>{h.type}</span>
                <span style={{ fontSize: 12, color: 'var(--color-text-secondary, #666)', marginLeft: 6 }}>· {h.name}</span>
              </div>
              <span style={{ fontSize: 12, color: 'var(--color-text-tertiary, #999)' }}>{h.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
