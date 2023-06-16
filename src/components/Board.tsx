import { useState } from 'react'
import { IBoard, ITask, useBoardContext } from '../context/boards'
import {
  DndContext,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './Column'
import SortableTask from './SortableTask'

type Props = {
  board: IBoard
}

const Board = ({ board }: Props) => {
  const { columns } = board
  const [, dispatch] = useBoardContext()
  const [draggingTask, setTaskDragging] = useState<ITask | null>(null)

  const sensors = useSensors(useSensor(PointerSensor))

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

    if (!over) return

    const activeColumnId = active.data.current?.sortable.containerId
    const overColumnId = over?.data.current?.sortable.containerId || over?.id

    if (
      !draggingTask ||
      !activeColumnId ||
      !overColumnId ||
      activeColumnId === overColumnId
    )
      return

    const overIndex = over.data.current?.sortable.index || 0

    dispatch({
      type: 'MOVE_TASK_BETWEEN_COLUMNS',
      payload: { activeColumnId, overColumnId, overIndex, draggingTask },
    })
  }

  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e
    if (!over || !active || active.id === over.id) return
    const activeColumnId = active.data.current?.sortable.containerId
    const activeIndex = active.data.current?.sortable.index
    const overIndex = over.data.current?.sortable.index

    const newTaskArray = arrayMove(
      board.columns[activeColumnId].tasks,
      activeIndex,
      overIndex
    )

    dispatch({
      type: 'REORDER_TASK',
      payload: { activeColumnId, newTaskArray },
    })
  }
  return (
    <DndContext
      sensors={sensors}
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
