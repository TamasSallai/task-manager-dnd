import { useEffect } from 'react'
import { IBoard, useBoardContext } from '../../context/boards'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import BoardHeader from './BoardHeader/BoardHeader'
import BoardBody from './BoardBody/BoardBody'
import './BoardWindow.css'

type Props = {
  board: IBoard
}

const BoardWindow = ({ board }: Props) => {
  const [, dispatch] = useBoardContext()

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'boards', board.id), (doc) => {
      dispatch({
        type: 'SET_CURRENT_BOARD',
        payload: { board: doc.data() as IBoard },
      })
    })

    return () => unsub()
  }, [board.id, dispatch])

  return (
    <div className="board-window">
      <BoardHeader boardName={board.name} />
      <BoardBody board={board} />
    </div>
  )
}

export default BoardWindow
