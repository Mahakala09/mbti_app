import { useState, useCallback } from 'react'
import { QUESTIONS } from '../data/questions'
import type { DimScore, HistoryRecord, Scores } from '../types'

const STORAGE_KEY = 'mbti_history_v2'

function loadHistory(): HistoryRecord[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}

function saveHistory(h: HistoryRecord[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(h.slice(0, 8))) } catch { /* noop */ }
}

export type Screen = 'start' | 'quiz' | 'result'

export function useQuiz() {
  const [screen, setScreen] = useState<Screen>('start')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUESTIONS.length).fill(null))
  const [history, setHistory] = useState<HistoryRecord[]>(loadHistory)

  const start = useCallback(() => { setScreen('quiz'); setCurrent(0) }, [])

  const select = useCallback((i: number) => {
    setAnswers(prev => { const next = [...prev]; next[current] = i; return next })
  }, [current])

  const next = useCallback(() => {
    if (answers[current] === null) return
    if (current < QUESTIONS.length - 1) { setCurrent(c => c + 1) }
    else { setScreen('result') }
  }, [answers, current])

  const prev = useCallback(() => { if (current > 0) setCurrent(c => c - 1) }, [current])

  const restart = useCallback(() => {
    setAnswers(new Array(QUESTIONS.length).fill(null))
    setCurrent(0)
    setScreen('start')
  }, [])

  const calcResult = useCallback((): { type: string; dims: DimScore[]; scores: Scores } => {
    const sc: Scores = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 }
    QUESTIONS.forEach((q, i) => {
      if (answers[i] === null) return
      const w = q.w[answers[i]!]
      sc[q.d[0] as keyof Scores] += w
      sc[q.d[1] as keyof Scores] += (1 - w)
    })
    const type =
      (sc.E >= sc.I ? 'E' : 'I') +
      (sc.N >= sc.S ? 'N' : 'S') +
      (sc.T >= sc.F ? 'T' : 'F') +
      (sc.J >= sc.P ? 'J' : 'P')

    const dims: DimScore[] = [
      { left:'E 外向', right:'I 內向', key:'EI', pct: Math.round(sc.E*100/Math.max(sc.E+sc.I,1)), dom: sc.E>=sc.I?'E':'I' },
      { left:'S 實感', right:'N 直覺', key:'SN', pct: Math.round(sc.S*100/Math.max(sc.S+sc.N,1)), dom: sc.S>=sc.N?'S':'N' },
      { left:'T 思考', right:'F 情感', key:'TF', pct: Math.round(sc.T*100/Math.max(sc.T+sc.F,1)), dom: sc.T>=sc.F?'T':'F' },
      { left:'J 判斷', right:'P 感知', key:'JP', pct: Math.round(sc.J*100/Math.max(sc.J+sc.P,1)), dom: sc.J>=sc.P?'J':'P' },
    ]
    return { type, dims, scores: sc }
  }, [answers])

  const addHistory = useCallback((rec: HistoryRecord) => {
    setHistory(prev => {
      const next = [rec, ...prev].slice(0, 8)
      saveHistory(next)
      return next
    })
  }, [])

  const progress = Math.round(current / QUESTIONS.length * 100)
  const currentQ = QUESTIONS[current]
  const currentAnswer = answers[current]
  const canGoNext = answers[current] !== null
  const isLast = current === QUESTIONS.length - 1

  return { screen, start, select, next, prev, restart, calcResult, addHistory, progress, currentQ, currentAnswer, canGoNext, isLast, current, total: QUESTIONS.length, history }
}
