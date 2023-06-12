import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { ITask } from '../context/boards'
import SortableTask from './SortableTask'
import { useDroppable } from '@dnd-kit/core'

type Props = {
  id: string
  tasks: ITask[]
}

const Column = ({ id, tasks }: Props) => {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div className="column-outer-container" ref={setNodeRef}>
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <div className="column-inner-container">
          {tasks.map((task) => (
            <SortableTask key={task.id} {...task} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}

export default Column
