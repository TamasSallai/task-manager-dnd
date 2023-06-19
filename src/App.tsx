import { useBoardContext } from './context/boards'
import { createNewBoardWithRandomValues } from './utils/createBoardWithRandomValues'
import Board from './components/Board'
import './App.css'

function App() {
  const [{ currentBoard, boards }, dispatch] = useBoardContext()

  return (
    <div className="flex-container">
      <div className="side-bar">
        <button onClick={createNewBoardWithRandomValues}>Add Board</button>
        <div className="board-list">
          {boards.map((board) => (
            <button
              key={board.id}
              onClick={() =>
                dispatch({
                  type: 'SELECT_BOARD',
                  payload: { board: board },
                })
              }
            >
              {board.name}
            </button>
          ))}
        </div>
      </div>

      {currentBoard && <Board board={currentBoard} />}
    </div>
  )
}

export default App
