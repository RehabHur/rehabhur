
import './Home.css'
import { useAuth } from '../../context/useAuth'
import { useExercises } from '../../context/useExercises'
import { usePersons } from '../../context/usePersons'
import { Link } from 'react-router-dom'
import logoUnahur from '../../assets/logo-unahur.png'

function Home() {
    const { user } = useAuth()
    const { exercises } = useExercises()
    const { persons } = usePersons()

    const totalPersonas = persons.length
    const totalPacientes = persons.filter(p => p.role === 'paciente').length
    const totalEjercicios = exercises.length


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
                        <h2 className="kpi-value">34</h2>
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
                                    <tr>
                                        <td className="fw-semibold text-dark">Rehabilitación lumbar inicial</td>
                                        <td>Helena Rodríguez</td>
                                        <td>Carlos Méndez</td>
                                        <td>Moderado</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-semibold text-dark">Movilidad de hombro</td>
                                        <td>Lucía Fernández</td>
                                        <td className="text-warning fw-semibold">Falta asignar</td>
                                        <td>Intenso</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-semibold text-dark">Fortalecimiento de rodilla</td>
                                        <td>Tomás Acosta</td>
                                        <td>Juan Pérez</td>
                                        <td>Intenso</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-semibold text-dark">Equilibrio y marcha</td>
                                        <td>Sofía Benitez</td>
                                        <td className="text-warning fw-semibold">Falta asignar</td>
                                        <td>Liviano</td>
                                    </tr>
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
                            <div className="activity-item">
                                <span className="activity-dot bg-success"></span>
                                <div>
                                    <p className="activity-title">Programa nuevo</p>
                                    <p className="activity-desc">Se creó el programa "Rehabilitación lumbar inicial"</p>
                                </div>
                                <span className="activity-time">Hace 18 min</span>
                            </div>
                            <div className="activity-item">
                                <span className="activity-dot bg-primary"></span>
                                <div>
                                    <p className="activity-title">Nueva persona</p>
                                    <p className="activity-desc">Se registró a la paciente Martina López</p>
                                </div>
                                <span className="activity-time">Hace 1 h</span>
                            </div>
                            <div className="activity-item">
                                <span className="activity-dot bg-info"></span>
                                <div>
                                    <p className="activity-title">Ejercicio actualizado</p>
                                    <p className="activity-desc">Se editó "Puente glúteo isométrico"</p>
                                </div>
                                <span className="activity-time">Hace 3 h</span>
                            </div>
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