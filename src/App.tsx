
import './App.css'
import CrearEjercicio from './components/CrearEjercicio'
import AppLayout from './components/layout/AppLayout'

function App() {
  return (
    <AppLayout>
      <CrearEjercicio />
    </AppLayout>
  )
}

export default App


// Ejemplo por si queremos fijar algo en el APP()
// function App() {
//   return (
//     <>
//       <main className="container py-5">
//         <div>
//           <h1 className="fw-bold text-success">Lista de Ejercicios</h1>
//           <CrearEjercicio />
//         </div>
//       </main>
//     </>
//   )
// }

//export default App
