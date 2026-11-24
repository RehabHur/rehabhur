
import './Home.css'
import { useAuth } from '../../context/useAuth'
import { useExercises } from '../../context/useExercises'
import { usePersons } from '../../context/usePersons'
import { usePrograms } from '../../context/usePrograms'
import { Link } from 'react-router-dom'
import logoUnahur from '../../assets/logo-unahur.png'
import { Icon } from '../../components/Icon'

function Home() {
    const { user } = useAuth()
    const { exercises, loading: exercisesLoading, error: exercisesError } = useExercises()
    const { persons, loading: personsLoading, error: personsError } = usePersons()
    const { programs, loading: programsLoading, error: programsError } = usePrograms()

    const displayedExercises = exercises.slice(0, 2)
    const displayedPersons = persons.slice(0, 2)
    const totalPacientes = persons.filter(p => p.role === 'paciente').length

    const countLabel = (loading: boolean, error: string | null, count: number) =>
        loading ? '…' : error ? '—' : count


    return (
        <section className="home-page">
            <header className="home-header">
                <div>
                    <h1 className="exercise-title home-title">
                        Hola, {user?.firstName}. Este es tu panel general
                    </h1>
                    <p className="home-subtitle">Estado general de la plataforma de telerehabilitación</p>
                </div>
            </header>

            <div className="home-kpi-grid">
                <div className="kpi-card">
                    <div>
                        <p className="kpi-title">Personas registradas</p>
                        <h2 className="kpi-value">{countLabel(personsLoading, personsError, persons.length)}</h2>
                        <p className="kpi-sub">{personsError ? 'No se pudo cargar' : 'Total en el sistema'}</p>
                    </div>
                    <div className="kpi-icon kpi-green">
                        <Icon name="people" />
                    </div>
                </div>

                <div className="kpi-card">
                    <div>
                        <p className="kpi-title">Pacientes registrados</p>
                        <h2 className="kpi-value">{countLabel(personsLoading, personsError, totalPacientes)}</h2>
                        <p className="kpi-sub">{personsError ? 'No se pudo cargar' : 'Con rol paciente'}</p>
                    </div>
                    <div className="kpi-icon kpi-teal">
                        <Icon name="heart-pulse" />
                    </div>
                </div>


                <div className="kpi-card">
                    <div>
                        <p className="kpi-title">Programas disponibles</p>
                        <h2 className="kpi-value">{countLabel(programsLoading, programsError, programs.length)}</h2>
                        <p className="kpi-sub">{programsError ? 'No disponible en la API' : 'Programas registrados'}</p>
                    </div>
                    <div className="kpi-icon kpi-yellow">
                        <Icon name="journal-check" />
                    </div>
                </div>

                <div className="kpi-card">
                    <div>
                        <p className="kpi-title">Ejercicios disponibles</p>
                        <h2 className="kpi-value">{countLabel(exercisesLoading, exercisesError, exercises.length)}</h2>
                        <p className="kpi-sub">{exercisesError ? 'No se pudo cargar' : 'En la biblioteca'}</p>
                    </div>
                    <div className="kpi-icon kpi-blue">
                        <Icon name="activity" />
                    </div>
                </div>
            </div>


            <div className="home-main-grid">
                {/* Columna Izquierda */}
                <div className="home-left-col">
                    <div className="home-widget">
                        <div className="widget-header">
                            <h3 className="widget-title">Programas disponibles</h3>
                            <Link to="/programs" className="widget-link">Ver todos →</Link>
                        </div>
                        <div className="table-responsive">
                            <table className="custom-table w-100">
                                <thead>
                                    <tr>
                                        <th>Nombre de programa</th>
                                        <th>Creado por</th>
                                        <th>Paciente asignado</th>
                                        <th>Nivel</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {programs.slice(0, 4).map((program) => (
                                        <tr key={program.id}>
                                            <td className="fw-semibold text-dark">{program.name}</td>
                                            <td>{program.createdBy}</td>
                                            <td className={program.assignedPatients.length === 0 ? "text-warning fw-semibold" : ""}>
                                                {program.assignedPatients.length === 0 ? 'Falta asignar' : program.assignedPatients[0].patientName}</td>
                                            <td>{program.difficulty}</td>
                                        </tr>
                                    ))}
                                    {!programsLoading && !programsError && programs.length === 0 && (
                                        <tr><td colSpan={4} className="text-center text-muted py-3">No hay programas registrados.</td></tr>
                                    )}
                                    {programsError && (
                                        <tr><td colSpan={4} className="text-center text-muted py-3">La API actual no expone el módulo de programas.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="home-widget mt-4">
                        <div className="widget-header">
                            <h3 className="widget-title">Registros disponibles</h3>
                        </div>
                        <div className="activity-list">
                            {displayedPersons.map((person) => (
                                    <div className="activity-item" key={`person-${person.id}`}>
                                        <span className="activity-dot bg-primary"></span>
                                            <div>
                                                <p className="activity-title">Persona registrada</p>
                                                <p className="activity-desc">Se registró a {person.firstName} {person.lastName} como {person.role}</p>
                                            </div>
                                    </div>
                                ))}

                            {displayedExercises.map((exercise) => (
                                    <div className="activity-item" key={`exercise-${exercise.id}`}>
                                        <span className="activity-dot bg-primary"></span>
                                            <div>
                                                <p className="activity-title">Ejercicio disponible</p>
                                                <p className="activity-desc">"{exercise.name}" está en la biblioteca</p>
                                            </div>
                                    </div>
                                ))}
                                
                            {displayedPersons.length === 0 && displayedExercises.length === 0 && (
                                    <p className="text-muted small text-center py-3">No hay registros para mostrar.</p>
                                )}
                        </div>
                    </div>
                </div>

                {/* Columna Derecha: Progreso y Bienvenida */}
                <div className="home-right-col">
                    <div className="home-widget">
                        <div className="widget-header">
                            <h3 className="widget-title">Estado de programas</h3>
                        </div>
                        <p className="text-muted mb-0">
                            {programsError
                                ? 'La API actual no expone el módulo de programas.'
                                : programsLoading
                                    ? 'Cargando programas...'
                                    : `${programs.length} programas registrados.`}
                        </p>
                    </div>

                    <div className="home-welcome-card mt-4">
                        <img src={logoUnahur} alt="Logo UNAHUR" className="home-unahur-logo" />
                        <h2 className="home-unahur-text">
                            ¡Bienvenido a tu plataforma de Telerehabilitación!
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home;