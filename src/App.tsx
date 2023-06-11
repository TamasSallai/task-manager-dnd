import { useBoardContext } from './context/boards'
import Board from './components/Board'
import './App.css'

function App() {
  const [{ currentBoard }] = useBoardContext()
  return <div>{currentBoard && <Board board={currentBoard} />}</div>
}

export default App
