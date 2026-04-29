import { useMemo } from 'react'
import { useQuiz } from './hooks/useQuiz'
import { StartScreen } from './components/StartScreen'
import { QuizScreen } from './components/QuizScreen'
import { ResultScreen } from './components/ResultScreen'

export default function App() {
  const quiz = useQuiz()
  const result = useMemo(() => quiz.screen === 'result' ? quiz.calcResult() : null, [quiz.screen])

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 1.25rem', fontFamily: 'system-ui, sans-serif' }}>
      {quiz.screen === 'start' && (
        <StartScreen history={quiz.history} onStart={quiz.start} />
      )}
      {quiz.screen === 'quiz' && quiz.currentQ && (
        <QuizScreen
          question={quiz.currentQ}
          questionIndex={quiz.current}
          total={quiz.total}
          progress={quiz.progress}
          currentAnswer={quiz.currentAnswer}
          canGoNext={quiz.canGoNext}
          isLast={quiz.isLast}
          onSelect={quiz.select}
          onNext={quiz.next}
          onPrev={quiz.prev}
        />
      )}
      {quiz.screen === 'result' && result && (
        <ResultScreen
          type={result.type}
          dims={result.dims}
          scores={result.scores}
          history={quiz.history}
          onRestart={quiz.restart}
          onAddHistory={quiz.addHistory}
        />
      )}
    </div>
  )
}
