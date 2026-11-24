import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePrograms } from '../../context/usePrograms'
import './ProgramList.css'

const ITEMS_PER_PAGE = 6

function ProgramList() {
    const { programs, loading, error } = usePrograms()
    const navigate = useNavigate()

    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const filteredPrograms = programs.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    )

    const totalPages = Math.ceil(filteredPrograms.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentPrograms = filteredPrograms.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    if (loading) return <section className="exercise-page"><p className="library-state">Cargando programas...</p></section>
    if (error) return <section className="exercise-page"><p className="library-state library-state-error">{error}</p></section>

    return (
        <section className="exercise-page">
            <header className="program-header">
                <div>
                    <h1 className="exercise-title">Programas</h1>
                    <p className="program-subtitle">Podés crear un nuevo programa, ver los programas creados y/o asignar los mismos a los pacientes</p>
                </div>
                <Link to="/programs/new" className="library-new-btn">+ Crear programa</Link>
            </header>

            <div className="library-search mb-4">
                <span className="library-search-icon" aria-hidden="true">⌕</span>
                <input
                    type="text"
                    placeholder="Buscar por nombre de programa"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                />
            </div>

            <div className="program-list">
                {currentPrograms.map((program) => {
                    const initials = program.createdBy.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                    const formattedDate = new Date(program.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '')

                    return (
                        <div key={program.id} className="program-card">
                            <div className="program-card-content">
                                <div className="program-avatar">{initials}</div>
                                <div className="program-info">
                                    <h3 className="program-name">{program.name}</h3>
                                    <p className="program-meta">
                                        Creador: {program.createdBy}<br />
                                        Dificultad: {program.difficulty}
                                    </p>
                                    <p className="program-date">{formattedDate}</p>
                                </div>
                            </div>
                            <div className="program-actions">
                                <Link to={`/programs/${program.id}/assign`} className="program-btn-assign">
                                    + Asignar paciente
                                </Link>
                                <div className="program-btns">
                                    <button type="button" className="library-btn library-btn-edit" onClick={() => navigate(`/programs/${program.id}/edit`)}>Editar</button>
                                    <button type="button" className="library-btn library-btn-delete">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {currentPrograms.length === 0 && (
                    <p className="library-empty">No se encontraron programas.</p>
                )}
            </div>

            {totalPages > 1 && (
                <div className="library-pagination mt-4">
                    <button className="library-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>← Anterior</button>
                    <span className="library-page-info">Página {currentPage} de {totalPages}</span>
                    <button className="library-page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>Siguiente →</button>
                </div>
            )}
        </section>
    )
}

export default ProgramList;