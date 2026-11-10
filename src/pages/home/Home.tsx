import './Home.css'
import logoUnahur from '../../assets/logo-unahur.png'
import { useAuth } from '../../context/useAuth'

function Home() {
    const { user } = useAuth()

    return (
        <section className="home-page">
            <header className="home-header">
                <h1 className="exercise-title home-title">
                    Inicio
                </h1>
            </header>

            <div className="home-card">
                <div className="home-welcome">
                    <p className="home-hello">Hola, {user?.firstName}</p>
                    <h2 className="home-greeting">
                        ¡Bienvenido a tu plataforma de <br />
                        Telerehabilitación!
                    </h2>
                    <p className="home-text">
                        Desde aquí podrás gestionar los ejercicios, armar rutinas y
                        acompañar la evolución de tus pacientes.
                    </p>
                    <p className="home-text-sub">
                        Usá el menú de la izquierda para navegar por los distintos módulos.
                    </p>
                </div>

                <div className="home-logo-container">
                    <img 
                        src={logoUnahur} 
                        alt="Logo UNAHUR" 
                        className="home-logo-img"
                    />
                </div>
            </div>
        </section>
    )
}

export default Home;