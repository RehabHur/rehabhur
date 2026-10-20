
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
                        <span aria-hidden="true">▦</span>
                        Inicio
                    </NavLink>

                    <NavLink
                        to="/exercises"
                        className={({ isActive }) =>
                            'sidebar-item' + (isActive ? ' sidebar-item-active' : '')
                        }
                    >
                        <span aria-hidden="true">▤</span>
                        Ejercicios
                    </NavLink>

                    <button type="button" className="sidebar-item">
                        <span aria-hidden="true">▧</span>
                        Programas
                    </button>

                    <button type="button" className="sidebar-item">
                        <span aria-hidden="true">♙</span>
                        Personas
                    </button>

                    <button type="button" className="sidebar-item">
                        <span aria-hidden="true">☼</span>
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
// verificar commit
export default Sidebar;