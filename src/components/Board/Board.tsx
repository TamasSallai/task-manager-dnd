import { useEffect, useState } from 'react'
import { IBoard, ITask, useBoardContext } from '../../context/boards'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import {
  DndContext,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  DragOverlay,
  useSensors,
  useSensor,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { PointerSensor } from '../../utils/extendSensors'
import Column from './Column/Column'
import ColumnModal from './ColumnModal/ColumnModal'
import SortableTask from './Column/SortableTask/SortableTask'
import './Board.css'

type Props = {
  board: IBoard
}

const Board = ({ board }: Props) => {
  const { columns } = board
  const [, dispatch] = useBoardContext()
  const [draggingTask, setDraggingTask] = useState<ITask | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'boards', board.id), (doc) => {
      dispatch({
        type: 'SET_CURRENT_BOARD',
        payload: { board: doc.data() as IBoard },
      })
    })

    return () => unsub()
  }, [board.id, dispatch])

  const sensors = useSensors(useSensor(PointerSensor))

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

  return (
    <div className="board-window">
      <div className="board-header">
        <h1 className="board-name">{board.name}</h1>
      </div>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="board-content">
          {Object.values(columns)
            .sort((a, b) => a.index - b.index)
            .map((column) => (
              <Column key={column.id} {...column} />
            ))}
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
        <DragOverlay>
          {draggingTask && <SortableTask {...draggingTask} />}
        </DragOverlay>
      </DndContext>
      {showModal && (
        <ColumnModal
          closeModal={() => setShowModal(false)}
          boardId={board.id}
          lastColumnIndex={board.lastColumnIndex}
        />
      )}
    </div>
  )
}

export default Board
