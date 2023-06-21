import { useState } from 'react'
import { IBoard, useBoardContext } from '../../context/boards'
import './SideBar.css'

type Props = {
  boards: IBoard[]
}

const SideBar = ({ boards }: Props) => {
  const [, dispatch] = useBoardContext()
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="sidebar" data-expanded={isExpanded}>
      <div className="sidebar-header">
        <button
          className="expand-button"
          data-expanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.8"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <div className="sidebar-section" data-expanded={isExpanded}>
        <div className="sidebar-section-header">
          <h3 className="sidebar-section-title">Boards</h3>
          <button className="add-board-button">Add Board</button>
        </div>
        <ul>
          {boards.map((board) => (
            <li className="board-item">
              <a
                className="board-link"
                onClick={() =>
                  dispatch({ type: 'SELECT_BOARD', payload: { board } })
                }
              >
                {board.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SideBar
