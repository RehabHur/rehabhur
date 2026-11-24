
import { useEffect, useState, type SubmitEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import type { Exercise, ExerciseInput } from '../../types/exercise'
import type { ExerciseOptions } from '../../types/option'
import { useExercises } from '../../context/useExercises'
import { getExerciseOptions } from '../../services/optionsService'
import { getErrorMessage } from '../../services/http'
import './CreateExercise.css'

const initialExercise: Exercise = {
    id: 0,
    name: '',
    bodyRegion: '',
    motionType: '',
    material: '',
    linkVideo: '',
    instructions: '',
}

function toExerciseInput(exercise: Exercise): ExerciseInput {
    return {
        name: exercise.name,
        bodyRegion: exercise.bodyRegion,
        motionType: exercise.motionType,
        material: exercise.material,
        linkVideo: exercise.linkVideo,
        instructions: exercise.instructions,
    }
}

type ExerciseFormProps = {
    isEditing: boolean
    existingExercise?: Exercise
}

function ExerciseForm({ isEditing, existingExercise }: ExerciseFormProps) {
    const navigate = useNavigate()
    const { addExercise, updateExercise } = useExercises()

    const [exercise, setExercise] = useState<Exercise>(existingExercise ?? initialExercise)
    const [options, setOptions] = useState<ExerciseOptions | null>(null)
    const [formValidated, setFormValidated] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [optionsError, setOptionsError] = useState<string | null>(null)

    useEffect(() => {
        async function loadOptions() {
            try {
                setOptions(await getExerciseOptions())
            } catch (error) {
                setOptionsError(getErrorMessage(error, 'No se pudieron cargar las opciones.'))
            }
        }
        loadOptions()
    }, [])

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget

        if (!form.checkValidity()) {
            event.stopPropagation()
            setFormValidated(true)
            return
        }

        try {
            setSubmitError(null)

            if (isEditing && existingExercise) {
                await updateExercise({ ...exercise, id: existingExercise.id })
            } else {
                await addExercise(toExerciseInput(exercise))
            }

            setFormValidated(false)
            navigate('/exercises')
        } catch (error) {
            setSubmitError(getErrorMessage(error, 'No se pudo guardar el ejercicio.'))
        }
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

            {submitError && <Alert variant="danger">{submitError}</Alert>}
            {optionsError && <Alert variant="warning">{optionsError}</Alert>}

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
                                        onChange={(event) => setExercise({ ...exercise, bodyRegion: event.target.value })}
                                        required
                                    >
                                        <option value="">Seleccioná una región</option>
                                        {exercise.bodyRegion && !options?.bodyRegions.some((opt) => opt.label === exercise.bodyRegion) && (
                                            <option value={exercise.bodyRegion}>{exercise.bodyRegion}</option>
                                        )}
                                        {options?.bodyRegions.map((opt) => (
                                            <option key={opt.id} value={opt.label}>{opt.label}</option>
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
                                        onChange={(event) => setExercise({ ...exercise, motionType: event.target.value })}
                                        required
                                    >
                                        <option value="">Seleccioná un tipo</option>
                                        {exercise.motionType && !options?.motionTypes.some((opt) => opt.label === exercise.motionType) && (
                                            <option value={exercise.motionType}>{exercise.motionType}</option>
                                        )}
                                        {options?.motionTypes.map((opt) => (
                                            <option key={opt.id} value={opt.label}>{opt.label}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Seleccioná un tipo de movimiento.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-4" controlId="material">
                            <Form.Label className="fw-semibold">
                                Material / Equipamiento<span className="required-mark"> *</span>
                            </Form.Label>
                            <Form.Select
                                value={exercise.material}
                                onChange={(event) => setExercise({ ...exercise, material: event.target.value })}
                                required
                            >
                                <option value="">Seleccioná el equipamiento requerido</option>
                                {exercise.material && !options?.materials.some((opt) => opt.label === exercise.material) && (
                                    <option value={exercise.material}>{exercise.material}</option>
                                )}
                                {options?.materials.map((opt) => (
                                    <option key={opt.id} value={opt.label}>{opt.label}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Seleccioná el material o equipamiento.
                            </Form.Control.Feedback>
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

function CreateExercise() {
    const { id } = useParams<{ id: string }>()
    const { exercises, loading, error } = useExercises()

    const isEditing = Boolean(id)
    const existingExercise = isEditing
        ? exercises.find((e) => e.id === Number(id))
        : undefined

    if (isEditing && loading) {
        return <section className="exercise-page"><p className="library-state">Cargando ejercicio...</p></section>
    }

    if (isEditing && error) {
        return <section className="exercise-page"><p className="library-state library-state-error">{error}</p></section>
    }

    if (isEditing && !existingExercise) {
        return (
            <section className="exercise-page">
                <Alert variant="warning">No se encontró el ejercicio solicitado.</Alert>
            </section>
        )
    }

    return (
        <ExerciseForm
            key={existingExercise?.id ?? 'new'}
            isEditing={isEditing}
            existingExercise={existingExercise}
        />
    )
}

export default CreateExercise;
