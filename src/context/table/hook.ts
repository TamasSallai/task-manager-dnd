import { useContext } from 'react'
import { TableContext } from './state'

export const useTableContext = () => useContext(TableContext)
