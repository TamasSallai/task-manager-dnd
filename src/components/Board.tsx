import { useState } from 'react'
import { IBoard, ITask, useBoardContext } from '../context/boards'
import {
  DndContext,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core'
import Column from './Column'
import SortableTask from './SortableTask'
import { arrayMove } from '@dnd-kit/sortable'
import { findColumnId } from '../utils/findColumnId'

type Props = {
  board: IBoard
}

const Board = ({ board }: Props) => {
  const { columns } = board
  const [, dispatch] = useBoardContext()
  const [draggingTask, setTaskDragging] = useState<ITask | null>(null)

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e
    const columnId = active.data.current?.sortable.containerId
    const activeTask = columns[columnId].tasks.find(
      (task) => task.id === active.id
    )
    if (activeTask) setTaskDragging(activeTask)
  }

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e
    const activeColumnId = findColumnId(board, active.id.toString())
    const overColumnId = over && findColumnId(board, over.id.toString())

    if (
      !draggingTask ||
      !activeColumnId ||
      !overColumnId ||
      activeColumnId === overColumnId
    )
      return

    dispatch({
      type: 'REORDER_TASK_BETWEEN_COLUMNS',
      payload: { activeColumnId, overColumnId, draggingTask },
    })
  }

  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e
    const activeColumnId = active.data.current?.sortable.containerId
    const overColumnId = over?.data.current?.sortable.containerId

    if (!activeColumnId || !overColumnId || activeColumnId !== overColumnId)
      return

    const oldIndex = board.columns[activeColumnId].tasks.findIndex(
      (task) => task.id === active.id
    )

    const newIndex = board.columns[activeColumnId].tasks.findIndex(
      (task) => task.id === over.id
    )

    const newTaskArray = arrayMove(
      board.columns[activeColumnId].tasks,
      oldIndex,
      newIndex
    )

    dispatch({
      type: 'REORDER_TASK',
      payload: { activeColumnId, newTaskArray },
    })
  }
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="board">
        {Object.values(columns).map((column) => (
          <Column key={column.id} {...column} />
        ))}
      </div>
      <DragOverlay>
        {draggingTask && <SortableTask {...draggingTask} />}
      </DragOverlay>
    </DndContext>
  )
}

export default Board
