
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import CrearEjercicio from './components/CrearEjercicio'
import ListaEjercicios from './components/ListaEjercicios'
import AppLayout from './components/layout/AppLayout'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/ejercicios" replace />} />
        <Route path="/ejercicios" element={<ListaEjercicios />} />
        <Route path="/ejercicios/nuevo" element={<CrearEjercicio />} />
        <Route path="/ejercicios/:id/editar" element={<CrearEjercicio />} />
      </Routes>
    </AppLayout>
  )
}

export default App;


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


// <Routes>
//   <Route path="/" element={<Inicio />} />
//   <Route path="/iniciar" element={<InicioSesion />} />
//   <Route path="/registrar" element={<RegistroUsuario />} />
//   <Route path="/publicacion/:id" element={<DetallePost />} />

//   {/* Rutas protegidas */}
//   <Route element={<RutaProtegida />}>
//     <Route path="/perfil/:nickName" element={<Perfil />} />
//     <Route path="/publicar" element={<CrearPost />} />
//   </Route>

//   {/* Pagina error */}
//   <Route path="*" element={<NoEncontrado />} />
// </Routes>
