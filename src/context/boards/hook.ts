import { useContext } from 'react'
import { BoardContext } from './state'

export const useBoardContext = () => useContext(BoardContext)
