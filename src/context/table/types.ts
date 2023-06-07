export interface ITask {
  id: string
  title: string
}

export interface IColumn {
  id: string
  title: string
  tasks: ITask[]
}

export interface ITable {
  id: string
  title: string
  columns: {
    [columnId: string]: IColumn
  }
}

export interface ITableContext {
  currentTable: ITable | null
  tables: { [id: string]: ITable }
}
