import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Note: React-beautiful-dnd has compatibility issues with StrictMode
// In production, you may want to remove StrictMode or use @hello-pangea/dnd instead
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

