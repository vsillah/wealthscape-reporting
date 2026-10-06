import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LifecyclePrototype from './LifecyclePrototype'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LifecyclePrototype />
  </StrictMode>,
)
