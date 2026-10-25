
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useExercises } from '../../context/ExerciseContext'
import type { Exercise } from '../../types/exercise'
import { bodyRegionsMock, motionTypesMock, materialsMock } from '../../mocks/optionsMock'
import { getEmbedUrl, getThumbnailUrl } from '../../utils/youtube'
import './ExerciseList.css'

const ITEMS_PER_PAGE = 8

const getLabel = (list: any[], id: number) => list.find(opt => opt.id === id)?.label || '-'

function ExerciseList() {
    const { exercises, loading, error, removeExercise } = useExercises()
    const navigate = useNavigate()

    const [selected, setSelected] = useState<Exercise | null>(null)
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const filteredExercises = exercises.filter((e) => {
        const text = search.toLowerCase()
        return (
            e.name.toLowerCase().includes(text) ||
            getLabel(bodyRegionsMock, e.bodyRegion).toLowerCase().includes(text) ||
            getLabel(materialsMock, e.material).toLowerCase().includes(text)
        )
    })

    const totalPages = Math.ceil(filteredExercises.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentExercises = filteredExercises.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setCurrentPage(1)
    }

    const handleDelete = async (id: number, event: React.MouseEvent) => {
        event.stopPropagation()
        if (!window.confirm('¿Seguro que querés eliminar este ejercicio?')) return
        await removeExercise(id)
        if (selected?.id === id) setSelected(null)
    }

    const handleEdit = (id: number, event: React.MouseEvent) => {
        event.stopPropagation()
        navigate(`/exercises/${id}/edit`)
    }

    if (loading) return <section className="exercise-page"><p className="library-state">Cargando ejercicios...</p></section>
    if (error) return <section className="exercise-page"><p className="library-state library-state-error">{error}</p></section>

    return (
        <section className="exercise-page">
            <header className="library-header">
                <h1 className="exercise-title library-title">Biblioteca de ejercicios</h1>
                <Link to="/exercises/new" className="library-new-btn">+ Nuevo ejercicio</Link>
            </header>

            <div className="library-search">
                <span className="library-search-icon" aria-hidden="true">⌕</span>
                <input
                    type="text"
                    placeholder="Buscar por nombre, región o material..."
                    value={search}
                    onChange={handleSearch}
                />
            </div>

            <div className="library-grid">
                <div className="library-list-card">
                    <p className="library-counter">{filteredExercises.length} ejercicios</p>
                    <ul className="library-list">
                        {currentExercises.map((exercise) => (
                            <li
                                key={exercise.id}
                                className={'library-item' + (selected?.id === exercise.id ? ' library-item-selected' : '')}
                                onClick={() => setSelected(exercise)}
                            >
                                <div className="library-thumb">
                                    {getThumbnailUrl(exercise.linkVideo) && (
                                        <img src={getThumbnailUrl(exercise.linkVideo)} alt={`Miniatura de ${exercise.name}`} loading="lazy" />
                                    )}
                                    <span className="library-thumb-play" aria-hidden="true">▶</span>
                                </div>

                                <div className="library-item-info">
                                    <p className="library-item-name">{exercise.name}</p>
                                    <p className="library-item-meta">
                                        {getLabel(bodyRegionsMock, exercise.bodyRegion)} · {getLabel(motionTypesMock, exercise.motionType)}
                                    </p>
                                </div>

                                <div className="library-item-actions">
                                    <button type="button" className="library-btn library-btn-edit" onClick={(e) => handleEdit(exercise.id, e)}>Editar</button>
                                    <button type="button" className="library-btn library-btn-delete" onClick={(e) => handleDelete(exercise.id, e)}>Eliminar</button>
                                </div>
                            </li>
                        ))}
                        {currentExercises.length === 0 && <li className="library-empty">No se encontraron ejercicios.</li>}
                    </ul>

                    {totalPages > 1 && (
                        <div className="library-pagination">
                            <button className="library-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>← Anterior</button>
                            <span className="library-page-info">Página {currentPage} de {totalPages}</span>
                            <button className="library-page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>Siguiente →</button>
                        </div>
                    )}
                </div>

                <div className="library-preview-card">
                    <h2 className="library-preview-title">Vista previa del video</h2>
                    {selected ? (
                        <>
                            <div className="library-video-wrapper">
                                <iframe
                                    src={getEmbedUrl(selected.linkVideo)}
                                    title={selected.name}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <p className="library-preview-name">{selected.name}</p>
                            <a href={selected.linkVideo} target="_blank" rel="noopener noreferrer" className="library-open-youtube">Abrir en YouTube ↗</a>
                        </>
                    ) : (
                        <p className="library-preview-empty">Seleccioná un ejercicio para ver su video.</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default ExerciseList;