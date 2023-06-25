import { useBoardContext } from './context/boards'
import BoardWindow from './components/BoardWindow/BoardWindow'
import SideBar from './components/SideBar/SideBar'
import './App.css'

function App() {
  const [{ currentBoard, boards }] = useBoardContext()

  return (
    <div className="flex-container">
      <SideBar boards={boards} />
      {currentBoard && <BoardWindow board={currentBoard} />}
    </div>
  )
}

export default App
