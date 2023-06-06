import './App.css'
import { createTable } from './firebase'

function App() {
  const handleClick = async () => {
    await createTable('Hello World')
  }

  return (
    <div>
      <button onClick={handleClick}>Create table</button>
    </div>
  )
}

export default App
