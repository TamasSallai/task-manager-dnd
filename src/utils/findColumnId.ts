import { IBoard } from '../context/boards'

export const findColumnId = (board: IBoard, id: string) => {
  if (id in board.columns) {
    return id
  }
  return Object.keys(board.columns).find((key) =>
    board.columns[key].tasks.find((task) => task.id === id)
  )
}
