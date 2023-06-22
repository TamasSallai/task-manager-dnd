import { useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import './ColumnModal.css'

type Props = {
  closeModal: () => void
  boardId: string
  lastColumnIndex: number
}

const ColumnModal = ({ closeModal, boardId, lastColumnIndex }: Props) => {
  const ref = useRef<HTMLDialogElement>(null)
  const [input, setInput] = useState('')

  useEffect(() => {
    const dialog = ref.current
    dialog?.showModal()
    return () => dialog?.close()
  }, [])

  const handleCreateColumn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const columnId = uuid()

    updateDoc(doc(db, 'boards', boardId), {
      lastColumnIndex: lastColumnIndex + 1,
      [`columns.${columnId}`]: {
        id: columnId,
        index: lastColumnIndex + 1,
        name: input,
        tasks: [],
      },
    })

    handleCloseModal()
  }

  const handleCloseModal = () => {
    ref.current?.close()
    closeModal()
  }

  return (
    <dialog ref={ref}>
      <form method="dialog" onSubmit={handleCreateColumn}>
        <div className="column-modal-body">
          <h1 className="column-modal-title">Create Column</h1>
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
            Create Column
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default ColumnModal
