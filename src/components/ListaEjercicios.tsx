import { ejerciciosMock } from "../mocks/ejerciciosMock";

function ListaEjercicios() {
    return (
        <div>
            <h2 className="fw-bold text-dark">Ejercicios cargados</h2>

            {ejerciciosMock.map((ejercicio) => (
                <div key={ejercicio.id}>
                <h3>{ejercicio.name}</h3>

                <p>Región corporal: {ejercicio.bodyRegion}</p>
                <p>Tipo: {ejercicio.motionType}</p>
                <p>Material: {ejercicio.material}</p>
                <p>Instrucciones: {ejercicio.instructions}</p>
                <a href={ejercicio.linkVideo} target="_blank" rel="noopener noreferrer" className="btn btn-outline-success">
                    Ver vídeo
                </a>
                </div>
            ))}
        </div>
    );
}

export default ListaEjercicios;
