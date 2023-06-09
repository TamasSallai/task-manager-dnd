import { IBoardContext } from './types'

export type Action =
  | { type: 'ADD_TASK' }
  | { type: 'EDIT_TASK' }
  | { type: 'DELETE_TASK' }
  | { type: 'REORDER_TASK_IN_COLUMN' }
  | { type: 'REORDER_TASK_BETWEEN_COLUMNS' }
  | { type: 'ADD_COLUMN' }
  | { type: 'ADD_Board' }

export const reducer = (state: IBoardContext, action: Action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return state
    case 'EDIT_TASK':
      return state
    case 'DELETE_TASK':
      return state
    case 'REORDER_TASK_IN_COLUMN':
      return state
    case 'REORDER_TASK_BETWEEN_COLUMNS':
      return state
    case 'ADD_COLUMN':
      return state
    default:
      return state
  }
}
