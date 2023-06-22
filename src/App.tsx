import { useBoardContext } from './context/boards'
import Board from './components/Board/Board'
import SideBar from './components/SideBar/SideBar'
import './App.css'

function App() {
  const [{ currentBoard, boards }] = useBoardContext()

  return (
    <div className="flex-container">
      <SideBar boards={boards} />
      {currentBoard && <Board board={currentBoard} />}
    </div>
  )
}

export default App
