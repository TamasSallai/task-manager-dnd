export interface ITask {
  id: string
  name: string
}

export interface IColumn {
  id: string
  index: number
  name: string
  tasks: ITask[]
}

export interface IBoard {
  id: string
  name: string
  lastColumnIndex: number
  columns: {
    [columnId: string]: IColumn
  }
}

export interface IBoardContext {
  currentBoard: IBoard | null
  backupBoard: IBoard | null
  boards: IBoard[]
}
