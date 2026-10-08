import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Prueba from './components/Prueba'
import EjerciciosPrueba from './components/EjerciciosPrueba'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Ejercicios</h1>
        <Prueba></Prueba>
        </div>
      <footer>
        <EjerciciosPrueba></EjerciciosPrueba>
      </footer>
    </>
  )
}

export default App
