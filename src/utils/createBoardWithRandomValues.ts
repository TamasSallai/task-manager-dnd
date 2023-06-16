import { v4 as uuidv4 } from 'uuid'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const createNewBoardWithRandomValues = async () => {
  const numberOfColumn = Math.floor(Math.random() * 5) + 2

  const columns = []

  for (let i = 0; i < numberOfColumn; i++) {
    const numberOfTasks = Math.floor(Math.random() * 5) + 1
    const tasks = []

    for (let j = 0; j < numberOfTasks; j++) {
      const task = {
        id: uuidv4(),
        name: `Task ${j + 1}`,
      }
      tasks.push(task)
    }

    const column = {
      id: uuidv4(),
      name: `Column ${i + 1}`,
      tasks: tasks,
    }

    columns.push(column)
  }

  const tableId = uuidv4()

  await setDoc(doc(db, 'boards', tableId), {
    id: tableId,
    name: 'Test',
    createdAt: serverTimestamp(),
    columns: columns.reduce(
      (memo, column) => ({ ...memo, [column.id]: column }),
      {}
    ),
  })
}
