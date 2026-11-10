
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import type { Role } from '../../types/person'
import './Sidebar.css'

const ROLE_LABELS: Record<Role, string> = {
    admin: 'Administrador',
    docente: 'Docente',
    estudiante: 'Estudiante',
    paciente: 'Paciente',
}

function Sidebar() {
    const { user, logout } = useAuth()

    return (
        <aside className="sidebar">
            <div>
                <div className="sidebar-brand">
                    <div className="sidebar-logo">RH</div>
                    <span className="sidebar-brand-name">RehabHur</span>
                </div>

                <nav className="sidebar-navigation">
                    <NavLink to="/" className="sidebar-item" end>
                        <i className="bi bi-house-door"></i>
                        Inicio
                    </NavLink>

                    <NavLink
                        to="/exercises"
                        className={({ isActive }) =>
                            'sidebar-item' + (isActive ? ' sidebar-item-active' : '')
                        }
                    >
                        <i className="bi bi-journal-medical"></i>
                        Ejercicios
                    </NavLink>

                    <button type="button" className="sidebar-item">
                        <i className="bi bi-calendar2-check"></i>
                        Programas
                    </button>

                    <NavLink
                        to="/persons"
                        className={({ isActive }) =>
                            'sidebar-item' + (isActive ? ' sidebar-item-active' : '')
                        }
                    >
                        <i className="bi bi-people"></i>
                        Personas
                    </NavLink>

                    <button type="button" className="sidebar-item">
                        <i className="bi bi-gear"></i>
                        Configuración
                    </button>

                    <button type="button" className="sidebar-item sidebar-item-logout" onClick={logout}>
                        <i className="bi bi-box-arrow-right"></i>
                        Salir
                    </button>
                </nav>
            </div>

            {user && (
                <div className="sidebar-user">
                    <div className="sidebar-avatar">
                        {user.firstName[0]}{user.lastName[0]}
                    </div>
                    <div className="sidebar-user-info">
                        <p className="sidebar-user-name">{user.firstName} {user.lastName}</p>
                        <p className="sidebar-user-role">{ROLE_LABELS[user.role]}</p>
                    </div>
                    <button
                        type="button"
                        className="sidebar-logout"
                        onClick={logout}
                        title="Cerrar sesión"
                        aria-label="Cerrar sesión"
                    >
                        <i className="bi bi-box-arrow-right"></i>
                    </button>
                </div>
            )}
        </aside>
    )
}

export default Sidebar;