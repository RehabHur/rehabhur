// import { ejerciciosMock } from "../mocks/ejerciciosMock";

// function ListaEjercicios() {
//     return (
//         <div>
//             <h2 className="fw-bold text-dark">Ejercicios cargados</h2>

//             {ejerciciosMock.map((ejercicio) => (
//                 <div key={ejercicio.id}>
//                 <h3>{ejercicio.name}</h3>

//                 <p>Región corporal: {ejercicio.bodyRegion}</p>
//                 <p>Tipo: {ejercicio.motionType}</p>
//                 <p>Material: {ejercicio.material}</p>
//                 <p>Instrucciones: {ejercicio.instructions}</p>
//                 <a href={ejercicio.linkVideo} target="_blank" rel="noopener noreferrer" className="btn btn-outline-success">
//                     Ver vídeo
//                 </a>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default ListaEjercicios;


// import { Link } from 'react-router-dom'
// import { useEjercicios } from '../context/EjerciciosContext'

// function ListaEjercicios() {
//     const { ejercicios } = useEjercicios()

//     return (
//         <div>
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h2 className="fw-bold text-dark mb-0">Ejercicios cargados</h2>
//                 <Link to="/ejercicios/nuevo" className="btn btn-success">
//                     + Nuevo ejercicio
//                 </Link>
//             </div>

//             {ejercicios.map((ejercicio) => (
//                 <div key={ejercicio.id}>
//                     <h3>{ejercicio.name}</h3>
//                     <p>Región corporal: {ejercicio.bodyRegion}</p>
//                     <p>Tipo: {ejercicio.motionType}</p>
//                     <p>Material: {ejercicio.material}</p>
//                     <p>Instrucciones: {ejercicio.instructions}</p>
//                     <a
//                         href={ejercicio.linkVideo}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="btn btn-outline-success"
//                     >
//                         Ver vídeo
//                     </a>
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default ListaEjercicios;


// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useEjercicios } from '../context/EjerciciosContext'
// import type { Ejercicio } from '../types/ejercicio'
// import './ListaEjercicios.css'

// function ListaEjercicios() {
//     const { ejercicios } = useEjercicios()
//     const [seleccionado, setSeleccionado] = useState<Ejercicio | null>(
//         ejercicios[0] ?? null
//     )
//     const [busqueda, setBusqueda] = useState('')

//     const ejerciciosFiltrados = ejercicios.filter((e) => {
//         const texto = busqueda.toLowerCase()
//         return (
//             e.name.toLowerCase().includes(texto) ||
//             e.bodyRegion.toLowerCase().includes(texto) ||
//             e.material.toLowerCase().includes(texto)
//         )
//     })

//     const getEmbedUrl = (url: string) => {
//         const idMatch = url.match(/(?:v=|\/embed\/|youtu\.be\/)([^&?/]+)/)
//         const videoId = idMatch?.[1]
//         return videoId ? `https://www.youtube.com/embed/${videoId}` : url
//     }

//     return (
//         <section className="exercise-page">
//             <header className="biblioteca-header">
//                 <h1 className="exercise-title biblioteca-title">
//                     Biblioteca de ejercicios
//                 </h1>
//                 <Link to="/ejercicios/nuevo" className="biblioteca-nuevo-btn">
//                     + Nuevo ejercicio
//                 </Link>
//             </header>

//             <div className="biblioteca-buscador">
//                 <span className="biblioteca-buscador-icon" aria-hidden="true">
//                     ⌕
//                 </span>
//                 <input
//                     type="text"
//                     placeholder="Buscar por nombre, región o material..."
//                     value={busqueda}
//                     onChange={(e) => setBusqueda(e.target.value)}
//                 />
//             </div>

//             <div className="biblioteca-grid">
//                 {/* Columna izquierda */}
//                 <div className="biblioteca-lista-card">
//                     <p className="biblioteca-contador">
//                         {ejerciciosFiltrados.length} ejercicios
//                     </p>

//                     <ul className="biblioteca-lista">
//                         {ejerciciosFiltrados.map((ejercicio) => (
//                             <li
//                                 key={ejercicio.id}
//                                 className={
//                                     'biblioteca-item' +
//                                     (seleccionado?.id === ejercicio.id
//                                         ? ' biblioteca-item-seleccionado'
//                                         : '')
//                                 }
//                                 onClick={() => setSeleccionado(ejercicio)}
//                             >
//                                 <span className="biblioteca-play" aria-hidden="true">
//                                     ▶
//                                 </span>

//                                 <div className="biblioteca-item-info">
//                                     <p className="biblioteca-item-nombre">
//                                         {ejercicio.name}
//                                     </p>
//                                     <p className="biblioteca-item-meta">
//                                         {ejercicio.bodyRegion} · {ejercicio.motionType}
//                                     </p>
//                                 </div>

//                                 <div className="biblioteca-item-acciones">
//                                     <button
//                                         type="button"
//                                         className="biblioteca-btn biblioteca-btn-editar"
//                                         onClick={(e) => e.stopPropagation()}
//                                     >
//                                         Editar
//                                     </button>
//                                     <button
//                                         type="button"
//                                         className="biblioteca-btn biblioteca-btn-eliminar"
//                                         onClick={(e) => e.stopPropagation()}
//                                     >
//                                         Eliminar
//                                     </button>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 {/* Columna derecha */}
//                 <div className="biblioteca-preview-card">
//                     <h2 className="biblioteca-preview-titulo">
//                         Vista previa del video
//                     </h2>

//                     {seleccionado ? (
//                         <>
//                             <div className="biblioteca-video-wrapper">
//                                 <iframe
//                                     src={getEmbedUrl(seleccionado.linkVideo)}
//                                     title={seleccionado.name}
//                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                     allowFullScreen
//                                 />
//                             </div>

//                             <p className="biblioteca-preview-nombre">
//                                 {seleccionado.name}
//                             </p>

//                             <a
//                                 href={seleccionado.linkVideo}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="biblioteca-abrir-youtube"
//                             >
//                                 Abrir en YouTube ↗
//                             </a>
//                         </>
//                     ) : (
//                         <p className="biblioteca-preview-vacio">
//                             Seleccioná un ejercicio para ver su video.
//                         </p>
//                     )}
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default ListaEjercicios;

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEjercicios } from '../context/EjerciciosContext'
import type { Ejercicio } from '../types/ejercicio'
import './ListaEjercicios.css'

function ListaEjercicios() {
    const { ejercicios, eliminarEjercicio } = useEjercicios()
    const navigate = useNavigate()

    const [seleccionado, setSeleccionado] = useState<Ejercicio | null>(
        ejercicios[0] ?? null
    )
    const [busqueda, setBusqueda] = useState('')

    const ejerciciosFiltrados = ejercicios.filter((e) => {
        const texto = busqueda.toLowerCase()
        return (
            e.name.toLowerCase().includes(texto) ||
            e.bodyRegion.toLowerCase().includes(texto) ||
            e.material.toLowerCase().includes(texto)
        )
    })

    const getYoutubeId = (url: string) => {
        const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([^&?/]+)/)
        return match?.[1] ?? null
    }

    const getEmbedUrl = (url: string) => {
        const id = getYoutubeId(url)
        return id ? `https://www.youtube.com/embed/${id}` : url
    }

    const getThumbnailUrl = (url: string) => {
        const id = getYoutubeId(url)
        return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : ''
    }

    const handleEliminar = (id: number, event: React.MouseEvent) => {
        event.stopPropagation()
        const confirmado = window.confirm(
            '¿Seguro que querés eliminar este ejercicio?'
        )
        if (!confirmado) return

        eliminarEjercicio(id)

        if (seleccionado?.id === id) {
            const restantes = ejercicios.filter((e) => e.id !== id)
            setSeleccionado(restantes[0] ?? null)
        }
    }

    const handleEditar = (id: number, event: React.MouseEvent) => {
        event.stopPropagation()
        navigate(`/ejercicios/${id}/editar`)
    }

    return (
        <section className="exercise-page">
            <header className="biblioteca-header">
                <h1 className="exercise-title biblioteca-title">
                    Biblioteca de ejercicios
                </h1>
                <Link to="/ejercicios/nuevo" className="biblioteca-nuevo-btn">
                    + Nuevo ejercicio
                </Link>
            </header>

            <div className="biblioteca-buscador">
                <span className="biblioteca-buscador-icon" aria-hidden="true">
                    ⌕
                </span>
                <input
                    type="text"
                    placeholder="Buscar por nombre, región o material..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>

            <div className="biblioteca-grid">
                {/* Columna izquierda: lista */}
                <div className="biblioteca-lista-card">
                    <p className="biblioteca-contador">
                        {ejerciciosFiltrados.length} ejercicios
                    </p>

                    <ul className="biblioteca-lista">
                        {ejerciciosFiltrados.map((ejercicio) => (
                            <li
                                key={ejercicio.id}
                                className={
                                    'biblioteca-item' +
                                    (seleccionado?.id === ejercicio.id
                                        ? ' biblioteca-item-seleccionado'
                                        : '')
                                }
                                onClick={() => setSeleccionado(ejercicio)}
                            >
                                <div className="biblioteca-thumb">
                                    {getThumbnailUrl(ejercicio.linkVideo) && (
                                        <img
                                            src={getThumbnailUrl(ejercicio.linkVideo)}
                                            alt={`Miniatura de ${ejercicio.name}`}
                                            loading="lazy"
                                        />
                                    )}
                                    <span className="biblioteca-thumb-play" aria-hidden="true">
                                        ▶
                                    </span>
                                </div>

                                <div className="biblioteca-item-info">
                                    <p className="biblioteca-item-nombre">
                                        {ejercicio.name}
                                    </p>
                                    <p className="biblioteca-item-meta">
                                        {ejercicio.bodyRegion} · {ejercicio.motionType}
                                    </p>
                                </div>

                                <div className="biblioteca-item-acciones">
                                    <button
                                        type="button"
                                        className="biblioteca-btn biblioteca-btn-editar"
                                        onClick={(e) => handleEditar(ejercicio.id, e)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        type="button"
                                        className="biblioteca-btn biblioteca-btn-eliminar"
                                        onClick={(e) => handleEliminar(ejercicio.id, e)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}

                        {ejerciciosFiltrados.length === 0 && (
                            <li className="biblioteca-vacio">
                                No se encontraron ejercicios con esa búsqueda.
                            </li>
                        )}
                    </ul>
                </div>

                {/* Columna derecha: preview */}
                <div className="biblioteca-preview-card">
                    <h2 className="biblioteca-preview-titulo">
                        Vista previa del video
                    </h2>

                    {seleccionado ? (
                        <>
                            <div className="biblioteca-video-wrapper">
                                <iframe
                                    src={getEmbedUrl(seleccionado.linkVideo)}
                                    title={seleccionado.name}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>

                            <p className="biblioteca-preview-nombre">
                                {seleccionado.name}
                            </p>

                            <a
                                href={seleccionado.linkVideo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="biblioteca-abrir-youtube"
                            >
                                Abrir en YouTube ↗
                            </a>
                        </>
                    ) : (
                        <p className="biblioteca-preview-vacio">
                            Seleccioná un ejercicio para ver su video.
                        </p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default ListaEjercicios;