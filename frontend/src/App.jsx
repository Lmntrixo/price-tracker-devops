import { useState, useEffect } from 'react'

function App() {
  const [apiMessage, setApiMessage] = useState("Connexion à l'API en cours...")

  useEffect(() => {
    // On appelle l'URL de notre Backend FastAPI
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message))
      .catch(() => setApiMessage("Impossible de contacter le Backend ❌"))
  }, [])

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1>📊 JE T"AIME CALINE, A LA FOLIE MA GOJOLINA</h1>
      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <p>Statut du Backend : <strong>{apiMessage}</strong></p>
      </div>
    </div>
  )
}

export default App
