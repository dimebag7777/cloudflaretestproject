import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Use relative path - Vite proxy will forward to backend
    fetch('/api/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not connect to the backend server.')
        }
        return response.json()
      })
      .then(data => {
        // Adding a slight delay for a smoother intro transition feel
        setTimeout(() => {
          setData(data.data)
          setLoading(false)
        }, 500)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setError(error.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="App">
      <header>
        <h1 className="title-gradient">Cloudstack Demo</h1>
        <p className="subtitle">Python • React • Docker • Cloudflare</p>
      </header>

      <div className="card glass">
        <h2>
          <span>⚡</span> Real-time Data
        </h2>
        
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Syncing with backend...</p>
          </div>
        )}
        
        {error && (
          <div className="error-box">
            <p><strong>Connection Error:</strong> {error}</p>
          </div>
        )}
        
        {!loading && !error && (
          <ul>
            {data.map(item => (
              <li key={item.id} className="data-item">
                <strong>{item.name}</strong>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer>
        <p className="read-the-docs subtitle">
          Built with premium aesthetics in mind.
        </p>
      </footer>
    </div>
  )
}

export default App
