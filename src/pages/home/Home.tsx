
import './Home.css'
import { useAuth } from '../../context/useAuth'
import { useExercises } from '../../context/useExercises'
import { usePersons } from '../../context/usePersons'
import { usePrograms } from '../../context/usePrograms'
import { Link } from 'react-router-dom'
import logoUnahur from '../../assets/logo-unahur.png'

function Home() {
    const { user } = useAuth()
    const { exercises } = useExercises()
    const { persons } = usePersons()
    const { programs } = usePrograms()

    const totalPersonas = persons.length
    const totalPacientes = persons.filter(p => p.role === 'paciente').length
    const totalEjercicios = exercises.length
    const totalProgramas = programs.length

    const recentExercises = [...exercises].reverse().slice(0, 2)
    const recentPersons = [...persons].reverse().slice(0, 2)


    return (
        <section className="home-page">
            <header className="home-header">
                <div>
                    <h1 className="exercise-title home-title">
                        Hola, {user?.firstName} éste es tu panel de general
                    </h1>
                    <p className="home-subtitle">Estado general de la plataforma de telerehabilitación</p>
                </div>
            </header>

            <div className="home-kpi-grid">
                <div className="kpi-card">
                    <div>
                        <p className="kpi-title">Personas registradas</p>
                        <h2 className="kpi-value">{totalPersonas}</h2>
                        <p className="kpi-sub">Total en el sistema</p>
                    </div>
                    <div className="kpi-icon kpi-green">
                        <i className="bi bi-people"></i>
                    </div>
                </div>

                <div className="kpi-card">
                    <div>
                        <p className="kpi-title">Pacientes activos</p>
                        <h2 className="kpi-value">{totalPacientes}</h2>
                        <p className="kpi-sub">En tratamiento</p>
                    </div>
                    <div className="kpi-icon kpi-teal">
                        <i className="bi bi-heart-pulse"></i>
                    </div>
                </div>


                <div className="kpi-card">
                    <div>
                        <p className="kpi-title">Programas activos</p>
                        <h2 className="kpi-value">{totalProgramas}</h2>
                        <p className="kpi-sub">2 falta asignar</p>
                    </div>
                    <div className="kpi-icon kpi-yellow">
                        <i className="bi bi-journal-check"></i>
                    </div>
                </div>

                <div className="kpi-card">
                    <div>
                        <p className="kpi-title">Ejercicios disponibles</p>
                        <h2 className="kpi-value">{totalEjercicios}</h2>
                        <p className="kpi-sub">En la biblioteca</p>
                    </div>
                    <div className="kpi-icon kpi-blue">
                        <i className="bi bi-activity"></i>
                    </div>
                </div>
            </div>


            <div className="home-main-grid">
                {/* Columna Izquierda */}
                <div className="home-left-col">
                    <div className="home-widget">
                        <div className="widget-header">
                            <h3 className="widget-title">Programas vigentes</h3>
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
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="home-widget mt-4">
                        <div className="widget-header">
                            <h3 className="widget-title">Actividad reciente</h3>
                            <span className="widget-sub">Últimas 24 horas</span>
                        </div>
                        <div className="activity-list">
                            {recentPersons.map((person, index) => (
                                    <div className="activity-item" key={`person-${person.id}`}>
                                        <span className="activity-dot bg-primary"></span>
                                            <div>
                                                <p className="activity-title">Nueva persona</p>
                                                <p className="activity-desc">Se registró a {person.firstName} {person.lastName} como {person.role}</p>
                                            </div>
                                        <span className="activity-time">Hace {index === 0 ? '1 h' : '2 h'}</span>
                                    </div>
                                ))}

                            {recentExercises.map((exercise, index) => (
                                    <div className="activity-item" key={`exercise-${exercise.id}`}>
                                        <span className="activity-dot bg-primary"></span>
                                            <div>
                                                <p className="activity-title">Ejercicio agregado</p>
                                                <p className="activity-desc">Se agregó "{exercise.name}" a la biblioteca</p>
                                            </div>
                                        <span className="activity-time">Hace {index === 0 ? '3 h' : '4 h'}</span>
                                    </div>
                                ))}
                                
                            {recentPersons.length === 0 && recentExercises.length === 0 && (
                                    <p className="text-muted small text-center py-3">No hay actividad reciente.</p>
                                )}
                        </div>
                    </div>
                </div>

                {/* Columna Derecha: Progreso y Bienvenida */}
                <div className="home-right-col">
                    <div className="home-widget">
                        <div className="widget-header">
                            <h3 className="widget-title">Progreso de programas</h3>
                            <span className="widget-sub">Total 63</span>
                        </div>
                        
                        <div className="progress-item">
                            <div className="d-flex justify-content-between mb-1">
                                <span className="text-muted fw-semibold">Activos</span>
                                <span className="fw-bold text-dark">34</span>
                            </div>
                            <div className="progress-bar-bg"><div className="progress-bar-fill bg-success" style={{ width: '70%' }}></div></div>
                        </div>
                        
                        <div className="progress-item mt-3">
                            <div className="d-flex justify-content-between mb-1">
                                <span className="text-muted fw-semibold">Pendientes</span>
                                <span className="fw-bold text-dark">8</span>
                            </div>
                            <div className="progress-bar-bg"><div className="progress-bar-fill bg-warning" style={{ width: '20%' }}></div></div>
                        </div>

                        <div className="progress-item mt-3">
                            <div className="d-flex justify-content-between mb-1">
                                <span className="text-muted fw-semibold">Finalizados</span>
                                <span className="fw-bold text-dark">21</span>
                            </div>
                            <div className="progress-bar-bg"><div className="progress-bar-fill bg-info" style={{ width: '40%' }}></div></div>
                        </div>
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