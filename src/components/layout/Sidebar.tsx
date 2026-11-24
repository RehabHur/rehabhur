
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { getErrorMessage } from '../../services/http'
import type { Role } from '../../types/person'
import { Icon } from '../Icon'
import './Sidebar.css'

const ROLE_LABELS: Record<Role, string> = {
    admin: 'Administrador',
    docente: 'Docente',
    estudiante: 'Estudiante',
    paciente: 'Paciente',
}

function Sidebar() {
    const { user, logout } = useAuth()
    const [logoutError, setLogoutError] = useState<string | null>(null)

    const handleLogout = async () => {
        try {
            setLogoutError(null)
            await logout()
        } catch (error) {
            setLogoutError(getErrorMessage(error, 'No se pudo cerrar la sesión.'))
        }
    }

    return (
        <aside className="sidebar">
            <div>
                <div className="sidebar-brand">
                    <div className="sidebar-logo">RH</div>
                    <span className="sidebar-brand-name">RehabHur</span>
                </div>

                <nav className="sidebar-navigation">
                    <NavLink to="/" className="sidebar-item" end>
                        <Icon name="house-door" />
                        Inicio
                    </NavLink>

                    <NavLink
                        to="/exercises"
                        className={({ isActive }) =>
                            'sidebar-item' + (isActive ? ' sidebar-item-active' : '')
                        }
                    >
                        <Icon name="journal-medical" />
                        Ejercicios
                    </NavLink>

                    <NavLink
                        to="/programs"
                        className={({ isActive }) =>
                            'sidebar-item' + (isActive ? ' sidebar-item-active' : '')
                        }
                    >
                        <Icon name="calendar2-check" />
                        Programas
                    </NavLink>

                    <NavLink
                        to="/persons"
                        className={({ isActive }) =>
                            'sidebar-item' + (isActive ? ' sidebar-item-active' : '')
                        }
                    >
                        <Icon name="people" />
                        Personas
                    </NavLink>

                    <button type="button" className="sidebar-item">
                        <Icon name="gear" />
                        Configuración
                    </button>

                    {logoutError && <p className="text-danger small px-3" role="alert">{logoutError}</p>}

                    <button type="button" className="sidebar-item sidebar-item-logout" onClick={handleLogout}>
                        <Icon name="box-arrow-right" />
                        Salir
                    </button>
                </nav>
            </div>

            {user && (
                <div className="sidebar-user">
                    <div className="sidebar-avatar">
                        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </div>
                    <div className="sidebar-user-info">
                        <p className="sidebar-user-name">{user.firstName} {user.lastName}</p>
                        <p className="sidebar-user-role">{ROLE_LABELS[user.role]}</p>
                    </div>
                    <button
                        type="button"
                        className="sidebar-logout"
                        onClick={handleLogout}
                        title="Cerrar sesión"
                        aria-label="Cerrar sesión"
                    >
                        <Icon name="box-arrow-right" />
                    </button>
                </div>
            )}
        </aside>
    )
}

export default Sidebar;