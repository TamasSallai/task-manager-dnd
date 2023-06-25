import './BoardHeader.css'

type Props = {
  boardName: string
}

const BoardHeader = ({ boardName }: Props) => {
  return (
    <div className="board-header">
      <h1 className="board-name">{boardName}</h1>
    </div>
  )
}

export default BoardHeader
