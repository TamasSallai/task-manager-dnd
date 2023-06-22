import { v4 as uuidv4 } from 'uuid'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const createNewBoardWithRandomValues = async () => {
  const numberOfColumn = Math.floor(Math.random() * 5) + 2

  const columns = []
  let lastColumnIndex = 0

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
      index: i,
      name: `Column ${i + 1}`,
      tasks: tasks,
    }

    columns.push(column)
    lastColumnIndex++
  }

  const tableId = uuidv4()

  await setDoc(doc(db, 'boards', tableId), {
    id: tableId,
    name: 'Test',
    createdAt: serverTimestamp(),
    lastColumnIndex,
    columns: columns.reduce(
      (memo, column) => ({ ...memo, [column.id]: column }),
      {}
    ),
  })
}
