import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AltsPrototype from './AltsPrototype'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AltsPrototype />
  </StrictMode>,
)
