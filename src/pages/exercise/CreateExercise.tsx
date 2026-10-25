
import { useEffect, useState, type SubmitEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import type { Exercise } from '../../types/exercise'
import type { ExerciseOptions } from '../../types/option'
import { useExercises } from '../../context/ExerciseContext'
import { getExerciseOptions } from '../../services/optionsService'
import './CreateExercise.css'

const initialExercise: Exercise = {
    id: 0,
    name: '',
    bodyRegion: 0,
    motionType: 0,
    material: 0,
    linkVideo: '',
    instructions: '',
}

function CreateExercise() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { exercises, addExercise, updateExercise } = useExercises()

    const isEditing = Boolean(id)
    const existingExercise = isEditing
        ? exercises.find((e) => e.id === Number(id))
        : undefined

    const [exercise, setExercise] = useState<Exercise>(
        existingExercise ?? initialExercise
    )
    const [options, setOptions] = useState<ExerciseOptions | null>(null)
    const [formValidated, setFormValidated] = useState(false)

    useEffect(() => {
        async function loadOptions() {
            const data = await getExerciseOptions()
            setOptions(data)
        }
        loadOptions()
    }, [])

    useEffect(() => {
        if (existingExercise) {
            setExercise(existingExercise)
        }
    }, [id, exercises])

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget

        if (!form.checkValidity()) {
            event.stopPropagation()
            setFormValidated(true)
            return
        }

        if (isEditing && existingExercise) {
            await updateExercise({ ...exercise, id: existingExercise.id })
        } else {
            await addExercise({ ...exercise, id: Date.now() })
        }

        setFormValidated(false)
        navigate('/exercises')
    }

    const handleCancel = () => {
        navigate('/exercises')
    }

    return (
        <section className="exercise-page">
            <p className="exercise-breadcrumb">
                <span className="exercise-breadcrumb-current">Ejercicios</span>
                <span className="exercise-breadcrumb-separator">{' > '}</span>
                {isEditing ? 'Editar ejercicio' : 'Nuevo ejercicio'}
            </p>

            <h1 className="exercise-title">
                {isEditing ? 'Editar ejercicio' : 'Crear nuevo ejercicio'}
            </h1>

            {isEditing && !existingExercise && (
                <Alert variant="warning">No se encontró el ejercicio solicitado.</Alert>
            )}

            <Card className="exercise-card">
                <Card.Body className="p-4 p-md-5">
                    <Form noValidate validated={formValidated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-4" controlId="exerciseName">
                            <Form.Label className="fw-semibold">
                                Nombre del ejercicio<span className="required-mark"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej.: Estiramiento de isquiotibiales con correa"
                                value={exercise.name}
                                minLength={3}
                                onChange={(event) => setExercise({ ...exercise, name: event.target.value })}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingresá un nombre de al menos 3 caracteres.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-4" controlId="bodyRegion">
                                    <Form.Label className="fw-semibold">
                                        Región corporal<span className="required-mark"> *</span>
                                    </Form.Label>
                                    <Form.Select
                                        value={exercise.bodyRegion}
                                        onChange={(event) => setExercise({ ...exercise, bodyRegion: Number(event.target.value) })}
                                        required
                                    >
                                        <option value="">Seleccioná una región</option>
                                        {options?.bodyRegions.map((opt) => (
                                            <option key={opt.id} value={opt.id}>{opt.label}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Seleccioná una región corporal.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-4" controlId="motionType">
                                    <Form.Label className="fw-semibold">
                                        Tipo de movimiento<span className="required-mark"> *</span>
                                    </Form.Label>
                                    <Form.Select
                                        value={exercise.motionType}
                                        onChange={(event) => setExercise({ ...exercise, motionType: Number(event.target.value) })}
                                        required
                                    >
                                        <option value="">Seleccioná un tipo</option>
                                        {options?.motionTypes.map((opt) => (
                                            <option key={opt.id} value={opt.id}>{opt.label}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Seleccioná un tipo de movimiento.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-4" controlId="material">
                            <Form.Label className="fw-semibold">Material / Equipamiento</Form.Label>
                            <Form.Select
                                value={exercise.material}
                                onChange={(event) => setExercise({ ...exercise, material: Number(event.target.value) })}
                            >
                                <option value="">Seleccioná el equipamiento requerido</option>
                                {options?.materials.map((opt) => (
                                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="linkVideo">
                            <Form.Label className="fw-semibold">
                                Link de vídeo de YouTube<span className="required-mark"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="url"
                                placeholder="Ej.: https://www.youtube.com/watch?v=..."
                                value={exercise.linkVideo}
                                onChange={(event) => setExercise({ ...exercise, linkVideo: event.target.value })}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingresá un enlace de vídeo válido.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="instructions">
                            <Form.Label className="fw-semibold">
                                Instrucciones de ejecución<span className="required-mark"> *</span>
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Describí detalladamente los pasos para realizar el ejercicio."
                                value={exercise.instructions}
                                minLength={10}
                                onChange={(event) => setExercise({ ...exercise, instructions: event.target.value })}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Escribí instrucciones con al menos 10 caracteres.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="exercise-actions d-flex justify-content-end gap-3">
                            <Button type="button" variant="outline-secondary" onClick={handleCancel}>
                                Cancelar
                            </Button>
                            <Button type="submit" className="exercise-save-button">
                                {isEditing ? 'Guardar cambios' : 'Guardar'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </section>
    )
}

export default CreateExercise;