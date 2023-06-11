import { arrayMove } from '@dnd-kit/sortable'
import { IBoardContext } from './'

export type Action =
  | { type: 'ADD_TASK' }
  | { type: 'EDIT_TASK' }
  | { type: 'DELETE_TASK' }
  | {
      type: 'REORDER_TASK'
      payload: {
        activeColumnId: string
        oldIndex: number
        newIndex: number
      }
    }
  | { type: 'REORDER_TASK_BETWEEN_COLUMNS' }
  | { type: 'ADD_COLUMN' }

export const reducer = (state: IBoardContext, action: Action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return state
    case 'EDIT_TASK':
      return state
    case 'DELETE_TASK':
      return state
    case 'REORDER_TASK': {
      const { activeColumnId, oldIndex, newIndex } = action.payload

      if (!state.currentBoard) return state

      return {
        ...state,
        currentBoard: {
          ...state.currentBoard,
          columns: {
            ...state.currentBoard?.columns,
            [activeColumnId]: {
              ...state.currentBoard.columns[activeColumnId],
              tasks: arrayMove(
                state.currentBoard.columns[activeColumnId].tasks,
                oldIndex,
                newIndex
              ),
            },
          },
        },
      }
    }
    case 'REORDER_TASK_BETWEEN_COLUMNS':
      return state
    case 'ADD_COLUMN':
      return state
    default:
      return state
  }
}
