import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

import './App.css'
import Prueba from './components/Prueba'
import EjerciciosPrueba from './components/EjerciciosPrueba'

function App() {
  return (
    <>
      <main className="container py-5">
        <Alert variant="success">
          React Bootstrap funciona correctamente.
        </Alert>

        <Button variant="success" className="mb-4">
          Botón de prueba
        </Button>

        <div>
          <h1 className="fw-bold text-success">Ejercicios</h1>
          <Prueba />
        </div>
      </main>

      <footer className="container pb-5">
        <EjerciciosPrueba />
      </footer>
    </>
  )
}

export default App
