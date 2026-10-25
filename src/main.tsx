import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ExerciseProvider } from './context/ExerciseContext'
import { PersonProvider } from './context/PersonContext'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ExerciseProvider>
                <PersonProvider>
                    <App />
                </PersonProvider>
            </ExerciseProvider>
        </BrowserRouter>
    </StrictMode>,
)