
// import { useState, type SubmitEvent } from 'react'
// import Alert from 'react-bootstrap/Alert'
// import Button from 'react-bootstrap/Button'
// import Card from 'react-bootstrap/Card'
// import Col from 'react-bootstrap/Col'
// import Form from 'react-bootstrap/Form'
// import Row from 'react-bootstrap/Row'

// import type { Ejercicio } from '../types/ejercicio'
// import './CrearEjercicio.css'

// const ejercicioInicial: Ejercicio = {
//     id: 0,
//     name: '',
//     bodyRegion: '',
//     motionType: '',
//     material: '',
//     linkVideo: '',
//     instructions: '',
// }

// function CrearEjercicio() {
//     const [ejercicio, setEjercicio] = useState<Ejercicio>(ejercicioInicial)

//     const [formularioValidado, setFormularioValidado] = useState(false)

//     const [mensajeExito, setMensajeExito] = useState(false)

//     const handleSubmit = (event: SubmitEvent<HTMLFormElement>,) => {
//         event.preventDefault()
//         const formulario = event.currentTarget

//         if (!formulario.checkValidity()) {
//             event.stopPropagation()
//             setFormularioValidado(true)
//             setMensajeExito(false)
//             return
//         }

//         const nuevoEjercicio: Ejercicio = {
//             ...ejercicio,
//             id: Date.now(),
//         }

//         console.log('Ejercicio creado:', nuevoEjercicio)

//         setEjercicio(ejercicioInicial)
//         setFormularioValidado(false)
//         setMensajeExito(true)
//     }

//     const handleCancelar = () => {
//         setEjercicio(ejercicioInicial)
//         setFormularioValidado(false)
//         setMensajeExito(false)
//     }

//     return (
//         <section className="exercise-page">
//             <p className="exercise-breadcrumb">
//                 <span className="exercise-breadcrumb-current">
//                 Ejercicios
//                 </span>

//                 <span className="exercise-breadcrumb-separator">
//                 {' > '}
//                 </span>

//                 Nuevo ejercicio
//             </p>

//             <h1 className="exercise-title">
//                 Crear nuevo ejercicio
//             </h1>

//             {mensajeExito && (
//                 <Alert variant="success" dismissible onClose={() => setMensajeExito(false)}>
//                     <Alert.Heading className="fs-5">
//                         Ejercicio guardado correctamente
//                     </Alert.Heading>

//                     <p className="mb-0">
//                         El ejercicio fue creado temporalmente con datos
//                         locales.
//                     </p>
//                 </Alert>
//             )}

//             <Card className="exercise-card">
//                 <Card.Body className="p-4 p-md-5">
//                     <Form noValidate validated={formularioValidado}onSubmit={handleSubmit}>
//                         <Form.Group className="mb-4"controlId="nombreEjercicio">
//                             <Form.Label className="fw-semibold">
//                                 Nombre del ejercicio
//                                 <span className="required-mark"> *</span>
//                             </Form.Label>

//                             <Form.Control
//                                 type="text"
//                                 placeholder="Ej.: Estiramiento de isquiotibiales con correa"
//                                 value={ejercicio.name}
//                                 minLength={3}
//                                 onChange={(event) =>setEjercicio({...ejercicio, name: event.target.value,})}
//                                 required
//                             />

//                             <Form.Control.Feedback type="invalid">
//                                 Ingresá un nombre de al menos 3 caracteres.
//                             </Form.Control.Feedback>
//                         </Form.Group>

//                         <Row>
//                             <Col md={6}>
//                                 <Form.Group className="mb-4"controlId="regionCorporal">
//                                     <Form.Label className="fw-semibold">
//                                         Región corporal
//                                         <span className="required-mark"> *</span>
//                                     </Form.Label>

//                                     <Form.Select value={ejercicio.bodyRegion}onChange={(event) =>setEjercicio({...ejercicio, bodyRegion: event.target.value,})}required>
//                                         <option value="">
//                                             Seleccioná una región
//                                         </option>
//                                         <option value="Cuello">Cuello</option>
//                                         <option value="Hombro">Hombro</option>
//                                         <option value="Espalda">Espalda</option>
//                                         <option value="Cadera">Cadera</option>
//                                         <option value="Pierna">Pierna</option>
//                                         <option value="Rodilla">Rodilla</option>
//                                         <option value="Tobillo">Tobillo</option>
//                                     </Form.Select>

//                                     <Form.Control.Feedback type="invalid">
//                                         Seleccioná una región corporal.
//                                     </Form.Control.Feedback>
//                                 </Form.Group>
//                             </Col>

//                             <Col md={6}>
//                                 <Form.Group className="mb-4"controlId="tipoMovimiento">
//                                     <Form.Label className="fw-semibold">
//                                         Tipo de movimiento
//                                         <span className="required-mark"> *</span>
//                                     </Form.Label>

//                                     <Form.Select value={ejercicio.motionType}onChange={(event) =>setEjercicio({...ejercicio, motionType: event.target.value,})}required>
//                                         <option value="">
//                                             Seleccioná un tipo
//                                         </option>
//                                         <option value="Movilidad">Movilidad</option>
//                                         <option value="Estiramiento">Estiramiento</option>
//                                         <option value="Fortalecimiento">Fortalecimiento</option>
//                                         <option value="Equilibrio">Equilibrio</option>
//                                         <option value="Coordinación">Coordinación</option>
//                                     </Form.Select>

//                                     <Form.Control.Feedback type="invalid">
//                                         Seleccioná un tipo de movimiento.
//                                     </Form.Control.Feedback>
//                                 </Form.Group>
//                             </Col>
//                         </Row>

//                         <Form.Group className="mb-4"controlId="material">
//                             <Form.Label className="fw-semibold">
//                                 Material / Equipamiento
//                             </Form.Label>

//                             <Form.Select value={ejercicio.material}onChange={(event) =>setEjercicio({...ejercicio, material: event.target.value,})}>
//                                 <option value="">
//                                     Seleccioná el equipamiento requerido
//                                 </option>
//                                 <option value="Sin equipamiento">Sin equipamiento</option>
//                                 <option value="Colchoneta">Colchoneta</option>
//                                 <option value="Banda elástica">Banda elástica</option>
//                                 <option value="Silla">Silla</option>
//                                 <option value="Pelota">Pelota</option>
//                                 <option value="Mancuernas">Mancuernas</option>
//                             </Form.Select>
//                         </Form.Group>

//                         <Form.Group className="mb-4"controlId="enlaceVideo">
//                             <Form.Label className="fw-semibold">
//                                 Link de vídeo de YouTube
//                                 <span className="required-mark"> *</span>
//                             </Form.Label>

//                             <Form.Control
//                                 type="url"
//                                 placeholder="Ej.: https://www.youtube.com/watch?v=..."
//                                 value={ejercicio.linkVideo}
//                                 onChange={(event) => setEjercicio({...ejercicio, linkVideo: event.target.value,})}
//                                 required
//                             />

//                             <Form.Control.Feedback type="invalid">
//                                 Ingresá un enlace de vídeo válido.
//                             </Form.Control.Feedback>
//                         </Form.Group>

//                         <Form.Group className="mb-4"controlId="instrucciones">
//                             <Form.Label className="fw-semibold">
//                                 Instrucciones de ejecución
//                                 <span className="required-mark"> *</span>
//                             </Form.Label>

//                             <Form.Control
//                                 as="textarea"
//                                 rows={5}
//                                 placeholder="Describí detalladamente los pasos para realizar el ejercicio."
//                                 value={ejercicio.instructions}
//                                 minLength={10}
//                                 onChange={(event) => setEjercicio({...ejercicio, instructions: event.target.value,})}
//                                 required
//                             />

//                             <Form.Control.Feedback type="invalid">
//                                 Escribí instrucciones con al menos 10 caracteres.
//                             </Form.Control.Feedback>
//                         </Form.Group>

//                         <div className="exercise-actions d-flex justify-content-end gap-3">
//                             <Button type="button" variant="outline-secondary" onClick={handleCancelar}>
//                                 Cancelar
//                             </Button>

//                             <Button type="submit" className="exercise-save-button">
//                                 Guardar
//                             </Button>
//                         </div>
//                     </Form>
//                 </Card.Body>
//             </Card>
//         </section>
//     );
// }

// export default CrearEjercicio;



import { useState, useEffect, type SubmitEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import type { Ejercicio } from '../types/ejercicio'
import { useEjercicios } from '../context/EjerciciosContext'
import './CrearEjercicio.css'

const ejercicioInicial: Ejercicio = {
    id: 0,
    name: '',
    bodyRegion: '',
    motionType: '',
    material: '',
    linkVideo: '',
    instructions: '',
}

function CrearEjercicio() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { ejercicios, agregarEjercicio, actualizarEjercicio } = useEjercicios()

    const esEdicion = Boolean(id)
    const ejercicioExistente = esEdicion
        ? ejercicios.find((e) => e.id === Number(id))
        : undefined

    const [ejercicio, setEjercicio] = useState<Ejercicio>(
        ejercicioExistente ?? ejercicioInicial
    )
    const [formularioValidado, setFormularioValidado] = useState(false)
    const [mensajeExito, setMensajeExito] = useState(false)

    // Si cambia el :id o llegan los ejercicios después, sincronizamos
    useEffect(() => {
        if (ejercicioExistente) {
            setEjercicio(ejercicioExistente)
        }
    }, [id, ejercicios])

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formulario = event.currentTarget

        if (!formulario.checkValidity()) {
            event.stopPropagation()
            setFormularioValidado(true)
            setMensajeExito(false)
            return
        }

        if (esEdicion && ejercicioExistente) {
            actualizarEjercicio({ ...ejercicio, id: ejercicioExistente.id })
        } else {
            const nuevoEjercicio: Ejercicio = {
                ...ejercicio,
                id: Date.now(),
            }
            agregarEjercicio(nuevoEjercicio)
        }

        setFormularioValidado(false)
        navigate('/ejercicios')
    }

    const handleCancelar = () => {
        navigate('/ejercicios')
    }

    return (
        <section className="exercise-page">
            <p className="exercise-breadcrumb">
                <span className="exercise-breadcrumb-current">
                    Ejercicios
                </span>
                <span className="exercise-breadcrumb-separator">
                    {' > '}
                </span>
                {esEdicion ? 'Editar ejercicio' : 'Nuevo ejercicio'}
            </p>

            <h1 className="exercise-title">
                {esEdicion ? 'Editar ejercicio' : 'Crear nuevo ejercicio'}
            </h1>

            {mensajeExito && (
                <Alert variant="success" dismissible onClose={() => setMensajeExito(false)}>
                    <Alert.Heading className="fs-5">
                        Ejercicio guardado correctamente
                    </Alert.Heading>
                    <p className="mb-0">
                        El ejercicio fue creado temporalmente con datos
                        locales.
                    </p>
                </Alert>
            )}

            {esEdicion && !ejercicioExistente && (
                <Alert variant="warning">
                    No se encontró el ejercicio solicitado.
                </Alert>
            )}

            <Card className="exercise-card">
                <Card.Body className="p-4 p-md-5">
                    <Form noValidate validated={formularioValidado} onSubmit={handleSubmit}>
                        <Form.Group className="mb-4" controlId="nombreEjercicio">
                            <Form.Label className="fw-semibold">
                                Nombre del ejercicio
                                <span className="required-mark"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej.: Estiramiento de isquiotibiales con correa"
                                value={ejercicio.name}
                                minLength={3}
                                onChange={(event) =>
                                    setEjercicio({ ...ejercicio, name: event.target.value })
                                }
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingresá un nombre de al menos 3 caracteres.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-4" controlId="regionCorporal">
                                    <Form.Label className="fw-semibold">
                                        Región corporal
                                        <span className="required-mark"> *</span>
                                    </Form.Label>
                                    <Form.Select
                                        value={ejercicio.bodyRegion}
                                        onChange={(event) =>
                                            setEjercicio({ ...ejercicio, bodyRegion: event.target.value })
                                        }
                                        required
                                    >
                                        <option value="">Seleccioná una región</option>
                                        <option value="Cuello">Cuello</option>
                                        <option value="Hombro">Hombro</option>
                                        <option value="Espalda">Espalda</option>
                                        <option value="Cadera">Cadera</option>
                                        <option value="Pierna">Pierna</option>
                                        <option value="Rodilla">Rodilla</option>
                                        <option value="Tobillo">Tobillo</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Seleccioná una región corporal.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-4" controlId="tipoMovimiento">
                                    <Form.Label className="fw-semibold">
                                        Tipo de movimiento
                                        <span className="required-mark"> *</span>
                                    </Form.Label>
                                    <Form.Select
                                        value={ejercicio.motionType}
                                        onChange={(event) =>
                                            setEjercicio({ ...ejercicio, motionType: event.target.value })
                                        }
                                        required
                                    >
                                        <option value="">Seleccioná un tipo</option>
                                        <option value="Movilidad">Movilidad</option>
                                        <option value="Estiramiento">Estiramiento</option>
                                        <option value="Fortalecimiento">Fortalecimiento</option>
                                        <option value="Equilibrio">Equilibrio</option>
                                        <option value="Coordinación">Coordinación</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Seleccioná un tipo de movimiento.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-4" controlId="material">
                            <Form.Label className="fw-semibold">
                                Material / Equipamiento
                            </Form.Label>
                            <Form.Select
                                value={ejercicio.material}
                                onChange={(event) =>
                                    setEjercicio({ ...ejercicio, material: event.target.value })
                                }
                            >
                                <option value="">Seleccioná el equipamiento requerido</option>
                                <option value="Sin equipamiento">Sin equipamiento</option>
                                <option value="Colchoneta">Colchoneta</option>
                                <option value="Banda elástica">Banda elástica</option>
                                <option value="Silla">Silla</option>
                                <option value="Pelota">Pelota</option>
                                <option value="Mancuernas">Mancuernas</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="enlaceVideo">
                            <Form.Label className="fw-semibold">
                                Link de vídeo de YouTube
                                <span className="required-mark"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="url"
                                placeholder="Ej.: https://www.youtube.com/watch?v=..."
                                value={ejercicio.linkVideo}
                                onChange={(event) =>
                                    setEjercicio({ ...ejercicio, linkVideo: event.target.value })
                                }
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingresá un enlace de vídeo válido.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="instrucciones">
                            <Form.Label className="fw-semibold">
                                Instrucciones de ejecución
                                <span className="required-mark"> *</span>
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Describí detalladamente los pasos para realizar el ejercicio."
                                value={ejercicio.instructions}
                                minLength={10}
                                onChange={(event) =>
                                    setEjercicio({ ...ejercicio, instructions: event.target.value })
                                }
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Escribí instrucciones con al menos 10 caracteres.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="exercise-actions d-flex justify-content-end gap-3">
                            <Button type="button" variant="outline-secondary" onClick={handleCancelar}>
                                Cancelar
                            </Button>
                            <Button type="submit" className="exercise-save-button">
                                {esEdicion ? 'Guardar cambios' : 'Guardar'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </section>
    )
}

export default CrearEjercicio;