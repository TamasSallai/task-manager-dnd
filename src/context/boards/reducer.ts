import { IBoard, IBoardContext, ITask } from './'

export type Action =
  | { type: 'SET_BOARDS'; payload: { boards: IBoard[] } }
  | { type: 'SELECT_BOARD'; payload: { board: IBoard } }
  | { type: 'ADD_TASK' }
  | { type: 'EDIT_TASK' }
  | { type: 'DELETE_TASK' }
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
  | { type: 'ADD_COLUMN' }

export const reducer = (state: IBoardContext, action: Action) => {
  switch (action.type) {
    case 'SET_BOARDS': {
      const { boards } = action.payload

      return {
        ...state,
        boards,
      }
    }
    case 'SELECT_BOARD': {
      return { ...state, currentBoard: action.payload.board }
    }
    case 'ADD_TASK':
      return state
    case 'EDIT_TASK':
      return state
    case 'DELETE_TASK':
      return state
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
    case 'ADD_COLUMN':
      return state
    default:
      return state
  }
}
