
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
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
                </nav>
            </div>

            <div className="sidebar-user">
                <div className="sidebar-avatar">EG</div>
                <div>
                    <p className="sidebar-user-name">Usuario de prueba</p>
                    <p className="sidebar-user-role">Admin</p>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;