import { useBoardContext } from './context/boards'

import Board from './components/Board/Board'
import './App.css'
import SideBar from './components/SideBar/SideBar'

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
