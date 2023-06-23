import { createContext, useEffect, useReducer, useState } from 'react'
import { Action, IBoard, IBoardContext, reducer } from './'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../firebase'

const initialState = {
  currentBoard: null,
  backupBoard: null,
  boards: [],
}

export const BoardContext = createContext<
  [IBoardContext, React.Dispatch<Action>]
>([initialState, () => initialState])

interface Props {
  children: React.ReactNode
}

export const BoardProvider = ({ children }: Props) => {
  const [table, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'boards'))
    const unsub = onSnapshot(q, (querySnapshot) => {
      const boards = querySnapshot.docs.map((doc) => doc.data() as IBoard)
      dispatch({ type: 'SET_BOARDS', payload: { boards } })
      setIsLoading(false)
    })
    return () => unsub()
  }, [])

  return (
    <BoardContext.Provider value={[table, dispatch]}>
      {!isLoading && children}
    </BoardContext.Provider>
  )
}
