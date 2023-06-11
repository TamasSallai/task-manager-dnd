import { v4 as uuidv4 } from 'uuid'
import { IBoard } from './context/boards'

export const initialBoardData: IBoard = {
  id: 'tableId',
  name: 'Table name',
  columns: {
    columnId1: {
      id: 'columnId1',
      name: 'Column 1 name',
      tasks: [
        {
          id: uuidv4(),
          name: 'Name 1',
        },
        {
          id: uuidv4(),
          name: 'Name 2',
        },
        {
          id: uuidv4(),
          name: 'Name 3',
        },
      ],
    },
    columnId2: {
      id: 'columnId2',
      name: 'Column 2 name',
      tasks: [
        {
          id: uuidv4(),
          name: 'Name 4',
        },
        {
          id: uuidv4(),
          name: 'Name 5',
        },
      ],
    },
    columnId3: {
      id: 'columnId3',
      name: 'Column 3 name',
      tasks: [
        {
          id: uuidv4(),
          name: 'Name 6',
        },
      ],
    },
  },
}
