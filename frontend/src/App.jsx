import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8000/api/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setData(data.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setError(error.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="App">
      <h1>Fullstack App Demo</h1>
      <div className="card">
        <h2>Backend Data:</h2>
        {loading && <p>Loading...</p>}
        {error && <p style={{color: 'red'}}>Error: {error}</p>}
        {!loading && !error && (
          <ul>
            {data.map(item => (
              <li key={item.id}>
                <strong>{item.name}</strong>: {item.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
