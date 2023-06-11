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

type Props = {
  board: IBoard
}

const Board = ({ board }: Props) => {
  const { columns } = board
  const [, dispatch] = useBoardContext()
  const [dragging, setDragging] = useState<ITask | null>(null)

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e
    const columnId = active.data.current?.sortable.containerId
    const activeTask = columns[columnId].tasks.find(
      (task) => task.id === active.id
    )
    if (activeTask) setDragging(activeTask)
  }

  const handleDragOver = (e: DragOverEvent) => {
    console.log('drag over')
  }

  const handleDragEnd = (e: DragEndEvent) => {
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

    dispatch({
      type: 'REORDER_TASK',
      payload: { activeColumnId, oldIndex, newIndex },
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
      <DragOverlay>{dragging && <SortableTask {...dragging} />}</DragOverlay>
    </DndContext>
  )
}

export default Board
