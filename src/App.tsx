import { useEffect } from 'react'
import { IBoard, useBoardContext } from './context/boards'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'
import { createNewBoardWithRandomValues } from './utils/createBoardWithRandomValues'
import Board from './components/Board'
import './App.css'

function App() {
  const [{ currentBoard, boards }, dispatch] = useBoardContext()

  useEffect(() => {
    getDocs(collection(db, 'boards')).then((querySnapshot) => {
      const boards = querySnapshot.docs.map((doc) => doc.data() as IBoard)
      dispatch({ type: 'SET_BOARDS', payload: { boards } })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex-container">
      <div className="side-bar">
        <button onClick={createNewBoardWithRandomValues}>Add Board</button>
        <div className="board-list">
          {boards.map((board) => (
            <button
              key={board.id}
              onClick={() =>
                dispatch({ type: 'SELECT_BOARD', payload: { board } })
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
