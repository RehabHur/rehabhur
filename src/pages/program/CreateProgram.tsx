import { useState, type KeyboardEvent, type SubmitEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import type { AuthUser } from '../../types/auth'
import type { Difficulty, Program, ProgramExercise, ProgramInput } from '../../types/program'
import { useAuth } from '../../context/useAuth'
import { useExercises } from '../../context/useExercises'
import { usePrograms } from '../../context/usePrograms'
import { getErrorMessage } from '../../services/http'
import { formatDate, getTodayIso } from '../../utils/date'
import { getThumbnailUrl } from '../../utils/youtube'
import '../exercise/CreateExercise.css'
import '../exercise/ExerciseList.css'
import './CreateProgram.css'

const DIFFICULTIES: Difficulty[] = ['Liviano', 'Moderado', 'Intenso']

type ProgramFormState = Omit<Program, 'difficulty'> & { difficulty: Difficulty | '' }

function createEmptyProgram(user: AuthUser | null): ProgramFormState {
    return {
        id: 0,
        name: '',
        difficulty: '',
        createdBy: user ? `${user.firstName} ${user.lastName}` : '',
        date: getTodayIso(),
        exercises: [],
        assignedPatients: [],
    }
}

type ProgramFormProps = {
    isEditing: boolean
    existingProgram?: Program
}

function ProgramForm({ isEditing, existingProgram }: ProgramFormProps) {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { addProgram, updateProgram } = usePrograms()
    const { exercises, loading: exercisesLoading, error: exercisesError } = useExercises()

    const [program, setProgram] = useState<ProgramFormState>(existingProgram ?? createEmptyProgram(user))
    const [formValidated, setFormValidated] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    const [selectedExerciseId, setSelectedExerciseId] = useState('')
    const [series, setSeries] = useState('3')
    const [repetitions, setRepetitions] = useState('10')
    const [exerciseError, setExerciseError] = useState<string | null>(null)

    const availableExercises = exercises.filter(
        (exercise) => !program.exercises.some((item) => item.id === exercise.id)
    )
    const showExercisesError = formValidated && program.exercises.length === 0

    const handleAddExercise = () => {
        const exercise = exercises.find((e) => e.id === Number(selectedExerciseId))
        const seriesNumber = Number(series)
        const repetitionsNumber = Number(repetitions)

        if (!exercise) {
            setExerciseError('Seleccioná un ejercicio de la lista.')
            return
        }

        if (
            !Number.isInteger(seriesNumber) || seriesNumber < 1 ||
            !Number.isInteger(repetitionsNumber) || repetitionsNumber < 1
        ) {
            setExerciseError('Las series y repeticiones tienen que ser números enteros mayores a 0.')
            return
        }

        const newItem: ProgramExercise = {
            id: exercise.id,
            name: exercise.name,
            series: seriesNumber,
            repetitions: repetitionsNumber,
        }

        setProgram((prev) => ({ ...prev, exercises: [...prev.exercises, newItem] }))
        setSelectedExerciseId('')
        setExerciseError(null)
    }

    const handleRemoveExercise = (exerciseId: number) => {
        setProgram((prev) => ({
            ...prev,
            exercises: prev.exercises.filter((item) => item.id !== exerciseId),
        }))
    }

    const handleAddOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            handleAddExercise()
        }
    }

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget

        if (!form.checkValidity() || program.exercises.length === 0 || !program.difficulty) {
            event.stopPropagation()
            setFormValidated(true)
            return
        }

        const input: ProgramInput = {
            name: program.name.trim(),
            difficulty: program.difficulty,
            createdBy: program.createdBy,
            date: program.date,
        }

        try {
            setSubmitError(null)

            if (isEditing && existingProgram) {
                await updateProgram({
                    ...input,
                    id: existingProgram.id,
                    exercises: program.exercises,
                    assignedPatients: program.assignedPatients,
                })
            } else {
                await addProgram(input, program.exercises)
            }

            setFormValidated(false)
            navigate('/programs')
        } catch (error) {
            setSubmitError(getErrorMessage(error, 'No se pudo guardar el programa.'))
        }
    }

    const handleCancel = () => {
        navigate('/programs')
    }

    return (
        <section className="exercise-page">
            <p className="exercise-breadcrumb">
                <span className="exercise-breadcrumb-current">Programas</span>
                <span className="exercise-breadcrumb-separator">{' > '}</span>
                {isEditing ? 'Editar programa' : 'Nuevo programa'}
            </p>

            <h1 className="exercise-title">
                {isEditing ? 'Editar programa' : 'Crear programa nuevo'}
            </h1>

            {submitError && <Alert variant="danger">{submitError}</Alert>}
            {exercisesError && <Alert variant="warning">{exercisesError}</Alert>}

            <Card className="exercise-card">
                <Card.Body className="p-4 p-md-5">
                    <Form noValidate validated={formValidated} onSubmit={handleSubmit} className="program-form">
                        <div className="program-section">
                            <h2 className="program-section-title">Datos del programa</h2>

                            <Form.Group className="mb-4" controlId="programName">
                                <Form.Label className="fw-semibold">
                                    Nombre<span className="required-mark"> *</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ej.: Rehabilitación lumbar inicial"
                                    value={program.name}
                                    minLength={3}
                                    onChange={(event) => setProgram({ ...program, name: event.target.value })}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingresá un nombre de al menos 3 caracteres.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Row>
                                <Col md={4}>
                                    <div className="mb-4">
                                        <p className="form-label fw-semibold">Creado por</p>
                                        <div className="program-info-box">{program.createdBy || '—'}</div>
                                    </div>
                                </Col>

                                <Col md={4}>
                                    <div className="mb-4">
                                        <p className="form-label fw-semibold">Fecha</p>
                                        <div className="program-info-box">{formatDate(program.date)}</div>
                                    </div>
                                </Col>

                                <Col md={4}>
                                    <Form.Group className="mb-4" controlId="programDifficulty">
                                        <Form.Label className="fw-semibold">
                                            Nivel de dificultad<span className="required-mark"> *</span>
                                        </Form.Label>
                                        <Form.Select
                                            value={program.difficulty}
                                            onChange={(event) =>
                                                setProgram({ ...program, difficulty: event.target.value as Difficulty | '' })
                                            }
                                            required
                                        >
                                            <option value="">Seleccioná un nivel</option>
                                            {DIFFICULTIES.map((level) => (
                                                <option key={level} value={level}>{level}</option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Seleccioná el nivel de dificultad.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>

                        <div className="program-section">
                            <h2 className="program-section-title">
                                Ejercicios<span className="required-mark"> *</span>
                            </h2>

                            <Row className="g-3 align-items-end program-add-row">
                                <Col md={6}>
                                    <Form.Group controlId="exerciseSelect">
                                        <Form.Label className="fw-semibold">Ejercicio</Form.Label>
                                        <Form.Select
                                            value={selectedExerciseId}
                                            onChange={(event) => setSelectedExerciseId(event.target.value)}
                                            disabled={exercisesLoading}
                                        >
                                            <option value="">
                                                {exercisesLoading ? 'Cargando ejercicios...' : 'Seleccioná un ejercicio'}
                                            </option>
                                            {availableExercises.map((exercise) => (
                                                <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                <Col xs={6} md={2}>
                                    <Form.Group controlId="exerciseSeries">
                                        <Form.Label className="fw-semibold">Series</Form.Label>
                                        <Form.Control
                                            type="number"
                                            inputMode="numeric"
                                            value={series}
                                            onChange={(event) => setSeries(event.target.value)}
                                            onKeyDown={handleAddOnEnter}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={6} md={2}>
                                    <Form.Group controlId="exerciseRepetitions">
                                        <Form.Label className="fw-semibold">Repeticiones</Form.Label>
                                        <Form.Control
                                            type="number"
                                            inputMode="numeric"
                                            value={repetitions}
                                            onChange={(event) => setRepetitions(event.target.value)}
                                            onKeyDown={handleAddOnEnter}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={2}>
                                    <Button
                                        type="button"
                                        className="exercise-save-button program-add-btn"
                                        onClick={handleAddExercise}
                                    >
                                        Añadir
                                    </Button>
                                </Col>
                            </Row>

                            {exerciseError && <p className="program-inline-error">{exerciseError}</p>}

                            {program.exercises.length === 0 ? (
                                <p className={'program-empty' + (showExercisesError ? ' program-empty-invalid' : '')}>
                                    {showExercisesError
                                        ? 'Agregá al menos un ejercicio al programa.'
                                        : 'Todavía no agregaste ejercicios.'}
                                </p>
                            ) : (
                                <ul className="program-item-list">
                                    {program.exercises.map((item) => {
                                        const libraryExercise = exercises.find((e) => e.id === item.id)
                                        const thumbnail = libraryExercise ? getThumbnailUrl(libraryExercise.linkVideo) : ''

                                        return (
                                            <li key={item.id} className="program-item">
                                                <div className="library-thumb">
                                                    {thumbnail && <img src={thumbnail} alt="" loading="lazy" />}
                                                    <span className="library-thumb-play" aria-hidden="true">▶</span>
                                                </div>
                                                <div className="program-item-info">
                                                    <p className="program-item-name">{item.name}</p>
                                                    <p className="program-item-meta">
                                                        <span className="program-item-dose">
                                                            {item.series} series · {item.repetitions} repeticiones
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="program-item-actions">
                                                    {libraryExercise?.linkVideo && (
                                                        <a
                                                            href={libraryExercise.linkVideo}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="program-video-link"
                                                        >
                                                            Ver video
                                                        </a>
                                                    )}
                                                    <button
                                                        type="button"
                                                        className="library-btn library-btn-delete"
                                                        onClick={() => handleRemoveExercise(item.id)}
                                                    >
                                                        Quitar
                                                    </button>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            )}
                        </div>

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

function CreateProgram() {
    const { id } = useParams<{ id: string }>()
    const { programs, loading, error } = usePrograms()

    const isEditing = Boolean(id)
    const existingProgram = isEditing
        ? programs.find((p) => p.id === Number(id))
        : undefined

    if (isEditing && loading) {
        return <section className="exercise-page"><p className="library-state">Cargando programa...</p></section>
    }

    if (isEditing && error) {
        return <section className="exercise-page"><p className="library-state library-state-error">{error}</p></section>
    }

    if (isEditing && !existingProgram) {
        return (
            <section className="exercise-page">
                <Alert variant="warning">No se encontró el programa solicitado.</Alert>
            </section>
        )
    }

    return (
        <ProgramForm
            key={existingProgram?.id ?? 'new'}
            isEditing={isEditing}
            existingProgram={existingProgram}
        />
    )
}

export default CreateProgram;
