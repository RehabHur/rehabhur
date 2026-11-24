import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { usePersons } from '../../context/usePersons'
import { useAuth } from '../../context/useAuth'
import type { Person, Role } from '../../types/person'
import { getErrorMessage } from '../../services/http'
import { Icon } from '../../components/Icon'
import { getUsers, type AccountUser } from '../../services/userService'
import '../exercise/CreateExercise.css'
import '../exercise/ExerciseList.css'
import './PersonList.css'

const ITEMS_PER_PAGE = 8
const roles: Role[] = ['admin', 'docente', 'estudiante', 'paciente']
type PersonRoleFilter = Role | 'all'
type PersonListRow = Pick<Person, 'id' | 'firstName' | 'lastName' | 'dni' | 'email' | 'role'> & {
    source: 'person' | 'account'
}

const roleLabels: Record<Role, string> = {
    admin: 'Administrador',
    docente: 'Docente',
    estudiante: 'Estudiante',
    paciente: 'Paciente',
}

function getInitialRole(value: string | null): PersonRoleFilter {
    return roles.includes(value as Role) ? (value as Role) : 'all'
}

function PersonList() {
    const { persons, loading, error, removePerson } = usePersons()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [accountResult, setAccountResult] = useState<{
        userId: number | null
        accounts: AccountUser[] | null
        error: string | null
    }>({ userId: null, accounts: null, error: null })

    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [activeTab, setActiveTab] = useState<PersonRoleFilter>(getInitialRole(searchParams.get('role')))
    const [actionError, setActionError] = useState<string | null>(null)

    useEffect(() => {
        if (user?.role !== 'admin') return

        let cancelled = false
        const userId = user.id
        getUsers()
            .then((accounts) => {
                if (!cancelled) setAccountResult({ userId, accounts, error: null })
            })
            .catch((error: unknown) => {
                if (!cancelled) {
                    setAccountResult({
                        userId,
                        accounts: null,
                        error: getErrorMessage(error, 'No se pudieron cargar las cuentas de usuario.'),
                    })
                }
            })

        return () => {
            cancelled = true
        }
    }, [user?.id, user?.role])

    const accountsLoading = user?.role === 'admin' && accountResult.userId !== user.id
    const accountUsers = user?.role === 'admin' && accountResult.userId === user.id
        ? accountResult.accounts ?? []
        : []
    const accountsError = user?.role === 'admin' && accountResult.userId === user.id
        ? accountResult.error
        : null
    const personRows: PersonListRow[] = persons.map(({ id, firstName, lastName, dni, email, role }) => ({
        id,
        firstName,
        lastName,
        dni,
        email,
        role,
        source: 'person',
    }))
    const accountRows: PersonListRow[] = accountUsers
        .filter((account) => !persons.some((person) =>
            person.email.toLowerCase() === account.email.toLowerCase() || person.dni === account.dni,
        ))
        .map(({ id, firstName, lastName, dni, email, role }) => ({
            id,
            firstName,
            lastName,
            dni,
            email,
            role,
            source: 'account',
        }))

    // 1. Filtramos por búsqueda y por la pestaña activa
    const filteredPersons = [...personRows, ...accountRows].filter((p) => {
        const text = search.toLowerCase()
        const matchesSearch = 
            p.firstName.toLowerCase().includes(text) ||
            p.lastName.toLowerCase().includes(text) ||
            p.dni.includes(text) ||
            p.email.toLowerCase().includes(text)
        
        const matchesRole = activeTab === 'all' || p.role === activeTab

        return matchesSearch && matchesRole
    })

    // 2. Paginación
    const totalPages = Math.ceil(filteredPersons.length / ITEMS_PER_PAGE)
    const displayPage = Math.min(currentPage, Math.max(totalPages, 1))
    const startIndex = (displayPage - 1) * ITEMS_PER_PAGE
    const currentPersons = filteredPersons.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setCurrentPage(1)
    }

    const handleTabChange = (key: string | null) => {
        if (key === null) return
        const role = getInitialRole(key)
        setActiveTab(role)
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev)
            if (role === 'all') next.delete('role')
            else next.set('role', role)
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

    if (loading || accountsLoading) return <section className="exercise-page"><p className="library-state">Cargando personas...</p></section>
    if (error) return <section className="exercise-page"><p className="library-state library-state-error">{error}</p></section>

    return (
        <section className="exercise-page">
            <header className="library-header">
                <h1 className="exercise-title library-title">Personas creadas</h1>
                <Link to="/persons/new" className="library-new-btn">+ Agregar Persona</Link>
            </header>

            <div className="library-search">
                <Icon name="search" className="library-search-icon" />
                <input
                    type="text"
                    placeholder="Buscar por nombre, email o DNI..."
                    value={search}
                    onChange={handleSearch}
                />
            </div>

            {accountsError && <Alert variant="warning">{accountsError}</Alert>}
            {actionError && <p className="library-state library-state-error">{actionError}</p>}

            {/* Pestañas de Bootstrap para filtrar por rol */}
            <Tabs
                activeKey={activeTab}
                onSelect={handleTabChange}
                className="mb-4 custom-tabs"
            >
                <Tab eventKey="all" title="Todas" />
                {user?.role === 'admin' && <Tab eventKey="admin" title="Administradores" />}
                <Tab eventKey="docente" title="Docentes" />
                <Tab eventKey="estudiante" title="Estudiantes" />
                <Tab eventKey="paciente" title="Pacientes" />
            </Tabs>

            <div className="library-list-card" style={{ width: '100%' }}>
                <p className="library-counter">{filteredPersons.length} personas encontradas</p>
                
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
                                <tr key={`${person.source}-${person.id}`}>
                                    <td>
                                        <div className="person-name-cell">
                                            <div className="person-avatar">
                                                {person.firstName.charAt(0)}{person.lastName.charAt(0)}
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
                                            {roleLabels[person.role]}
                                        </span>
                                    </td>
                                    <td className="text-end">
                                        {person.source === 'person' ? (
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
                                        ) : (
                                            <span className="small text-muted">Cuenta de acceso</span>
                                        )}
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
                        <button className="library-page-btn" disabled={displayPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>← Anterior</button>
                        <span className="library-page-info">Página {displayPage} de {totalPages}</span>
                        <button className="library-page-btn" disabled={displayPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>Siguiente →</button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default PersonList;