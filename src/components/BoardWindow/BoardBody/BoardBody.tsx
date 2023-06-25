import { useState } from 'react'
import { IBoard, ITask, useBoardContext } from '../../../context/boards'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import {
  DndContext,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  DragOverlay,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { PointerSensor } from '../../../utils/extendSensors'
import Column from './Column/Column'
import ColumnModal from '../../ColumnModal/ColumnModal'
import SortableTask from './SortableTask/SortableTask'
import './BoardBody.css'

type Props = {
  board: IBoard
}

const BoardBody = ({ board }: Props) => {
  const { columns } = board
  const [, dispatch] = useBoardContext()
  const [draggingTask, setDraggingTask] = useState<ITask | null>(null)
  const [showModal, setShowModal] = useState(false)

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e
    const columnId = active.data.current?.sortable.containerId as string
    const activeTask = columns[columnId].tasks.find(
      (task) => task.id === active.id
    )
    if (activeTask) setDraggingTask(activeTask)
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

    if (!over || !active) return

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

    try {
      setDoc(doc(db, 'boards', board.id), board)
    } catch (error) {
      dispatch({ type: 'FALLBACK_BOARD' })
      alert(error)
    }
  }

  const sensors = useSensors(useSensor(PointerSensor))

  return (
    <div className="board-container">
      {showModal && (
        <ColumnModal
          closeModal={() => setShowModal(false)}
          boardId={board.id}
          lastColumnIndex={board.lastColumnIndex}
        />
      )}

      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <div className="columns-container">
          {Object.values(columns)
            .sort((a, b) => a.index - b.index)
            .map((column) => (
              <Column key={column.id} {...column} />
            ))}
        </div>
        <DragOverlay>
          {draggingTask && <SortableTask {...draggingTask} />}
        </DragOverlay>
      </DndContext>

      <div>
        <button
          className="add-column-button"
          onClick={() => setShowModal(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new column
        </button>
      </div>
    </div>
  )
}

export default BoardBody
