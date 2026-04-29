import type { Question } from '../types'

interface Props {
  question: Question
  questionIndex: number
  total: number
  progress: number
  currentAnswer: number | null
  canGoNext: boolean
  isLast: boolean
  onSelect: (i: number) => void
  onNext: () => void
  onPrev: () => void
}

export function QuizScreen({ question, questionIndex, total, progress, currentAnswer, canGoNext, isLast, onSelect, onNext, onPrev }: Props) {
  return (
    <div style={{ padding: '1.5rem 0' }}>
      <div style={{ height: 3, background: 'var(--color-border-tertiary, #e5e5e5)', borderRadius: 2, marginBottom: '1.75rem' }}>
        <div style={{ height: 3, background: '#7F77DD', borderRadius: 2, width: `${progress}%`, transition: 'width 0.4s ease' }} />
      </div>

      <div style={{ fontSize: 12, color: 'var(--color-text-tertiary, #999)', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
        題目 {questionIndex + 1} / {total}
      </div>
      <div style={{ fontSize: 16, color: 'var(--color-text-primary, #111)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
        {question.t}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {question.o.map((opt, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            style={{
              width: '100%', textAlign: 'left', padding: '12px 16px',
              borderRadius: 12,
              border: currentAnswer === i ? '0.5px solid #7F77DD' : '0.5px solid var(--color-border-secondary, #ccc)',
              background: currentAnswer === i ? '#EEEDFE' : 'var(--color-background-primary, #fff)',
              color: currentAnswer === i ? '#3C3489' : 'var(--color-text-primary, #111)',
              fontSize: 14, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10, lineHeight: 1.5,
              transition: 'all 0.15s',
            }}
          >
            <span style={{ width: 24, height: 24, borderRadius: '50%', border: '0.5px solid currentColor', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0, opacity: 0.55 }}>
              {String.fromCharCode(65 + i)}
            </span>
            {opt}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem' }}>
        <button
          onClick={onPrev}
          disabled={questionIndex === 0}
          style={{ background: 'none', border: '0.5px solid var(--color-border-secondary, #ccc)', borderRadius: 8, padding: '8px 16px', color: 'var(--color-text-secondary, #666)', fontSize: 13, cursor: questionIndex === 0 ? 'not-allowed' : 'pointer', opacity: questionIndex === 0 ? 0.3 : 1 }}
        >
          ← 上一題
        </button>
        <button
          onClick={onNext}
          style={{ background: '#534AB7', border: 'none', borderRadius: 8, padding: '8px 20px', color: '#fff', fontSize: 13, cursor: canGoNext ? 'pointer' : 'not-allowed', opacity: canGoNext ? 1 : 0.35, transition: 'opacity 0.2s' }}
        >
          {isLast ? '查看結果 →' : '下一題 →'}
        </button>
      </div>
    </div>
  )
}
