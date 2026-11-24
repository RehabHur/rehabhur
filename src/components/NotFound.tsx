import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
    return (
        <section className="notfound-page">
            <h1 className="notfound-title">404</h1>
            <p className="notfound-text">
                La página que buscás no existe o fue movida.
            </p>
            <Link to="/exercises" className="notfound-btn">
                Volver a la biblioteca
            </Link>
        </section>
    )
}

export default NotFound;