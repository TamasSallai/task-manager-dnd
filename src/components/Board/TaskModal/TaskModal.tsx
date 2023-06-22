import { useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import './TaskModal.css'
import { useBoardContext } from '../../../context/boards'

type Props = {
  closeModal: () => void

  columnId: string
}

const TaskModal = ({ closeModal, columnId }: Props) => {
  const ref = useRef<HTMLDialogElement>(null)
  const [input, setInput] = useState('')
  const [{ currentBoard }] = useBoardContext()

  useEffect(() => {
    const dialog = ref.current
    dialog?.showModal()
    return () => dialog?.close()
  }, [])

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (currentBoard)
      updateDoc(doc(db, 'boards', currentBoard.id), {
        [`columns.${columnId}.tasks`]: arrayUnion({
          id: uuid(),
          name: input,
        }),
      })

    handleCloseModal()
  }

  const handleCloseModal = () => {
    ref.current?.close()
    closeModal()
  }

  return (
    <dialog ref={ref}>
      <form method="dialog" onSubmit={handleCreateTask}>
        <div className="column-modal-body">
          <h1 className="column-modal-title">Create Task</h1>
          <input
            className="input-primary"
            type="text"
            placeholder="Column name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="column-modal-button-container">
          <button className="button-primary" onClick={handleCloseModal}>
            Cancel
          </button>
          <button className="button-primary filled" type="submit">
            Create Task
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default TaskModal
