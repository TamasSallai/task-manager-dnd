import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { ITask } from '../context/boards'
import SortableTask from './SortableTask'

type Props = {
  id: string
  tasks: ITask[]
}

const Column = ({ id, tasks }: Props) => {
  const { setNodeRef } = useDroppable({ id })

  return (
    <SortableContext
      id={id}
      items={tasks}
      strategy={verticalListSortingStrategy}
    >
      <div className="column-inner-container" ref={setNodeRef}>
        {tasks.map((task) => (
          <SortableTask key={task.id} {...task} />
        ))}
      </div>
    </SortableContext>
  )
}

export default Column
