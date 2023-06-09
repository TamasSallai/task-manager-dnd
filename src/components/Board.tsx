import { useState } from 'react'
import {
  DndContext,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core'
import { ITask } from '../context/boards/types'
import Column from './Column'

import SortableTask from './SortableTask'
import { useBoardContext } from '../context/boards/hook'

const Board = () => {
  const { currentBoard } = useBoardContext()
  const [dragging, setDragging] = useState<ITask | null>(null)

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e
    const columnId = active.data.current?.sortable.containerId
    console.log(currentBoard.columns)

    const activeTask = initialTableData.columns[columnId].tasks.find(
      (task) => task.id === active.id
    )
    if (activeTask) {
      setDragging(activeTask)
    }
  }

  const handleDragOver = (e: DragOverEvent) => {
    console.log('drag over')
  }

  const handleDragEnd = (e: DragEndEvent) => {
    console.log('drag end')
    const { active, over } = e
    const activeColumnId = active.data.current?.sortable.containerId
    const overColumnId = over?.data.current?.sortable.containerId

    console.log('activeColumnId:', activeColumnId)
    console.log('overColumnId:', overColumnId)
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
