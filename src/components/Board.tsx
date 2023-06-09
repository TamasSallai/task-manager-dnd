import { useState } from 'react'
import {
  DndContext,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core'
import { ITask } from '../context/table/types'
import Column from './Column'
import { initialTableData } from '../data'
import SortableTask from './SortableTask'

const Board = () => {
  const [dragging, setDragging] = useState<ITask | null>(null)
  const { columns } = initialTableData

  const handleDragStart = (e: DragStartEvent) => {
    console.log('drag start')
  }

  const handleDragOver = (e: DragOverEvent) => {
    console.log('drag over')
  }

  const handleDragEnd = (e: DragEndEvent) => {
    console.log('drag end')
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
