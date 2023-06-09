import { createContext, useReducer } from 'react'
import { Action, reducer } from './reducer'
import { IBoardContext } from './types'

const initialState = { currentBoard: null, boards: {} }

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
