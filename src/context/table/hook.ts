import { useContext } from 'react'
import { BoardContext } from './state'

export const useTableContext = () => useContext(BoardContext)
