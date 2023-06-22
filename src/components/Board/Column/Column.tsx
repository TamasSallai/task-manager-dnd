import { useState } from 'react'
import { ITask } from '../../../context/boards'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import SortableTask from './SortableTask/SortableTask'
import TaskModal from '../TaskModal/TaskModal'
import './Column.css'

type Props = {
  id: string
  name: string
  tasks: ITask[]
}

const Column = ({ id, name, tasks }: Props) => {
  const { setNodeRef } = useDroppable({ id })
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="column" ref={setNodeRef}>
      <div className="column-name">{name}</div>
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <div className="sortable-container">
          {tasks.map((task) => (
            <SortableTask key={task.id} {...task} />
          ))}
        </div>
        <button className="new-task-button" onClick={() => setShowModal(true)}>
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
          Create task
        </button>
      </SortableContext>

      {showModal && (
        <TaskModal columnId={id} closeModal={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default Column
