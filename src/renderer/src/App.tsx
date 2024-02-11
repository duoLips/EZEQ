import { EquationSolver } from './components/EquationSolver'
import { SaveButton } from './components/SaveButton'
import { useState } from 'react'

function App(): JSX.Element {
  const [content, setContent] = useState<object>({})
  return (
    <>
      <div className="flex h-full items-center justify-center flex-col">
        <h1 className="text-4xl text-blue-950">EZQE</h1>
        <h2 className="text-3xl text-blue-200">Easy quadratic equation solver!</h2>
        <EquationSolver content={content} setContent={setContent} />
        {Object.keys(content).length !== 0 ? (
          <SaveButton content={content} setContent={setContent} />
        ) : null}
      </div>
    </>
  )
}

export default App
