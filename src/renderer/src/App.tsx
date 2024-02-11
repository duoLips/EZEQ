import { EquationSolver } from './components/EquationSolver'
import { SaveButton } from './components/SaveButton'
function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div className="flex h-full items-center justify-center flex-col">
        <h1 className="text-4xl text-blue-950">EZQE</h1>
        <h2 className="text-3xl text-blue-200">Easy quadratic equation solver!</h2>
        <EquationSolver />
        <SaveButton />
      </div>
    </>
  )
}

export default App
