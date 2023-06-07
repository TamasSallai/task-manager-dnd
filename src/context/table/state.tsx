import { createContext, useReducer } from 'react'
import { Action, reducer } from './reducer'
import { ITableContext } from './types'

const initialState = { currentTable: null, tables: {} }

export const TableContext = createContext<
  [ITableContext, React.Dispatch<Action>]
>([initialState, () => initialState])

interface Props {
  children: React.ReactNode
}

export const TableProvider = ({ children }: Props) => {
  const [table, dispatch] = useReducer(reducer, initialState)

  return (
    <TableContext.Provider value={[table, dispatch]}>
      {children}
    </TableContext.Provider>
  )
}
