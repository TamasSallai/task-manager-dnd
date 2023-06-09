import { IBoard, IBoardContext, ITask } from './'

export type Action =
  | { type: 'SET_BOARDS'; payload: { boards: IBoard[] } }
  | { type: 'SET_CURRENT_BOARD'; payload: { board: IBoard } }
  | { type: 'FALLBACK_BOARD' }
  | {
      type: 'REORDER_TASK'
      payload: {
        activeColumnId: string
        newTaskArray: ITask[]
      }
    }
  | {
      type: 'MOVE_TASK_BETWEEN_COLUMNS'
      payload: {
        activeColumnId: string
        overColumnId: string
        overIndex: number
        draggingTask: ITask
      }
    }

export const reducer = (state: IBoardContext, action: Action) => {
  switch (action.type) {
    case 'SET_BOARDS':
      return {
        ...state,
        boards: action.payload.boards,
      }
    case 'SET_CURRENT_BOARD':
      return {
        ...state,
        currentBoard: action.payload.board,
        backupBoard: action.payload.board,
      }
    case 'FALLBACK_BOARD':
      return {
        ...state,
        currentBoard: state.backupBoard,
      }
    case 'REORDER_TASK': {
      const { activeColumnId, newTaskArray } = action.payload

      if (!state.currentBoard) return state

      return {
        ...state,
        currentBoard: {
          ...state.currentBoard,
          columns: {
            ...state.currentBoard?.columns,
            [activeColumnId]: {
              ...state.currentBoard.columns[activeColumnId],
              tasks: newTaskArray,
            },
          },
        },
      }
    }
    case 'MOVE_TASK_BETWEEN_COLUMNS': {
      const { activeColumnId, overColumnId, overIndex, draggingTask } =
        action.payload

      if (!state.currentBoard) return state

      return {
        ...state,
        currentBoard: {
          ...state.currentBoard,
          columns: {
            ...state.currentBoard.columns,
            [activeColumnId]: {
              ...state.currentBoard.columns[activeColumnId],
              tasks: state.currentBoard.columns[activeColumnId].tasks.filter(
                (task) => task.id !== draggingTask.id
              ),
            },
            [overColumnId]: {
              ...state.currentBoard.columns[overColumnId],
              tasks: [
                ...state.currentBoard.columns[overColumnId].tasks.slice(
                  0,
                  overIndex
                ),
                draggingTask,
                ...state.currentBoard.columns[overColumnId].tasks.slice(
                  overIndex
                ),
              ],
            },
          },
        },
      }
    }
    default:
      return state
  }
}
