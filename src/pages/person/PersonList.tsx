import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { usePersons } from '../../context/usePersons'
import type { Role } from '../../types/person'
import { getErrorMessage } from '../../services/http'
import './PersonList.css'

const ITEMS_PER_PAGE = 8
const roles: Role[] = ['admin', 'docente', 'estudiante', 'paciente']

function getInitialRole(value: string | null): Role {
    return roles.includes(value as Role) ? (value as Role) : 'paciente'
}

function PersonList() {
    const { persons, loading, error, removePerson } = usePersons()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [activeTab, setActiveTab] = useState<Role>(getInitialRole(searchParams.get('role')))
    const [actionError, setActionError] = useState<string | null>(null)

    // 1. Filtramos por búsqueda y por la pestaña activa
    const filteredPersons = persons.filter((p) => {
        const text = search.toLowerCase()
        const matchesSearch = 
            p.firstName.toLowerCase().includes(text) ||
            p.lastName.toLowerCase().includes(text) ||
            p.dni.includes(text) ||
            p.email.toLowerCase().includes(text)
        
        const matchesRole = p.role === activeTab

        return matchesSearch && matchesRole
    })

    // 2. Paginación
    const totalPages = Math.ceil(filteredPersons.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentPersons = filteredPersons.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setCurrentPage(1)
    }

    const handleTabChange = (key: string | null) => {
        const role = getInitialRole(key)
        setActiveTab(role)
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev)
            next.set('role', role)
            return next
        }, { replace: true })
        setCurrentPage(1)
    }

    const handleDelete = async (id: number, event: React.MouseEvent) => {
        event.stopPropagation()
        if (!window.confirm('¿Seguro que querés eliminar esta persona?')) return
        try {
            setActionError(null)
            await removePerson(id)
        } catch (error) {
            setActionError(getErrorMessage(error, 'No se pudo eliminar la persona.'))
        }
    }

    const handleEdit = (id: number) => {
        navigate(`/persons/${id}/edit`)
    }

    if (loading) return <section className="exercise-page"><p className="library-state">Cargando personas...</p></section>
    if (error) return <section className="exercise-page"><p className="library-state library-state-error">{error}</p></section>

    return (
        <section className="exercise-page">
            <header className="library-header">
                <h1 className="exercise-title library-title">Personas creadas</h1>
                <Link to="/persons/new" className="library-new-btn">+ Agregar Persona</Link>
            </header>

            <div className="library-search">
                <span className="library-search-icon" aria-hidden="true">⌕</span>
                <input
                    type="text"
                    placeholder="Buscar por nombre, email o DNI..."
                    value={search}
                    onChange={handleSearch}
                />
            </div>

            {actionError && <p className="library-state library-state-error">{actionError}</p>}

            {/* Pestañas de Bootstrap para filtrar por rol */}
            <Tabs
                activeKey={activeTab}
                onSelect={handleTabChange}
                className="mb-4 custom-tabs"
            >
                <Tab eventKey="admin" title="Administradores" />
                <Tab eventKey="docente" title="Docentes" />
                <Tab eventKey="estudiante" title="Estudiantes" />
                <Tab eventKey="paciente" title="Pacientes" />
            </Tabs>

            <div className="library-list-card" style={{ width: '100%' }}>
                <p className="library-counter">{filteredPersons.length} personas registradas</p>
                
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0 custom-table">
                        <thead>
                            <tr>
                                <th>Nombre y Apellido</th>
                                <th>Contacto</th>
                                <th>Perfil</th>
                                <th className="text-end">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPersons.map((person) => (
                                <tr key={person.id}>
                                    <td>
                                        <div className="person-name-cell">
                                            <div className="person-avatar">
                                                {person.firstName[0]}{person.lastName[0]}
                                            </div>
                                            <span className="fw-semibold text-dark">
                                                {person.firstName} {person.lastName}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="person-contact-cell">
                                            <span>{person.email}</span>
                                            <span className="text-muted small">DNI {person.dni}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge-role badge-${person.role}`}>
                                            {person.role.charAt(0).toUpperCase() + person.role.slice(1)}
                                        </span>
                                    </td>
                                    <td className="text-end">
                                        <div className="library-item-actions justify-content-end">
                                            <button
                                                type="button"
                                                className="library-btn library-btn-edit"
                                                onClick={() => handleEdit(person.id)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                type="button"
                                                className="library-btn library-btn-delete"
                                                onClick={(e) => handleDelete(person.id, e)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {currentPersons.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-4 text-muted">
                                        No se encontraron personas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Paginación (idéntica a ejercicios) */}
                {totalPages > 1 && (
                    <div className="library-pagination mt-4">
                        <button className="library-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>← Anterior</button>
                        <span className="library-page-info">Página {currentPage} de {totalPages}</span>
                        <button className="library-page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>Siguiente →</button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default PersonList;