export interface ITask {
  id: string
  name: string
}

export interface IColumn {
  id: string
  name: string
  tasks: ITask[]
}

export interface IBoard {
  id: string
  name: string
  columns: {
    [columnId: string]: IColumn
  }
}

export interface IBoardContext {
  currentTable: IBoard | null
  tables: { [id: string]: IBoard }
}
