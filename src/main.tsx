import React from 'react'
import ReactDOM from 'react-dom/client'
import { BoardProvider } from './context/boards'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BoardProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BoardProvider>
)
