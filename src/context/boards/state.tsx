import { createContext, useReducer } from 'react'
import { Action, IBoardContext, reducer } from './'
import { initialBoardData } from '../../data'

const initialState = { currentBoard: initialBoardData, boards: {} }

export const BoardContext = createContext<
  [IBoardContext, React.Dispatch<Action>]
>([initialState, () => initialState])

interface Props {
  children: React.ReactNode
}

export const BoardProvider = ({ children }: Props) => {
  const [table, dispatch] = useReducer(reducer, initialState)

  return (
    <BoardContext.Provider value={[table, dispatch]}>
      {children}
    </BoardContext.Provider>
  )
}
