import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { ITask } from '../context/table/types'
import SortableTask from './SortableTask'

type Props = {
  id: string
  tasks: ITask[]
}

const Column = ({ id, tasks }: Props) => {
  return (
    <SortableContext
      id={id}
      items={tasks}
      strategy={verticalListSortingStrategy}
    >
      <div className="column">
        {tasks.map((task) => (
          <SortableTask key={task.id} {...task} />
        ))}
      </div>
    </SortableContext>
  )
}

export default Column
