import { useState, type SubmitEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import type { Person, Role } from '../../types/person'
import { usePersons } from '../../context/usePersons'
import { getErrorMessage } from '../../services/http'
// import './CreatePerson.css'

const initialPerson: Person = {
    id: 0,
    firstName: '',
    lastName: '',
    dni: '',
    email: '',
    nationality: 'Argentina',
    role: 'paciente',
}

type PersonFormProps = {
    isEditing: boolean
    existingPerson?: Person
}

function PersonForm({ isEditing, existingPerson }: PersonFormProps) {
    const navigate = useNavigate()
    const { addPerson, updatePerson } = usePersons()

    const [person, setPerson] = useState<Person>(existingPerson ?? initialPerson)
    const [formValidated, setFormValidated] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

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

            if (isEditing && existingPerson) {
                await updatePerson({ ...person, id: existingPerson.id })
            } else {
                await addPerson({
                    firstName: person.firstName,
                    lastName: person.lastName,
                    dni: person.dni,
                    email: person.email,
                    nationality: person.nationality,
                    role: person.role,
                })
            }

            setFormValidated(false)
            navigate(`/persons?role=${person.role}`)
        } catch (error) {
            setSubmitError(getErrorMessage(error, 'No se pudo guardar la persona.'))
        }
    }

    const handleCancel = () => navigate('/persons')

    return (
        <section className="exercise-page">
            <p className="exercise-breadcrumb">
                <span className="exercise-breadcrumb-current">Personas</span>
                <span className="exercise-breadcrumb-separator">{' > '}</span>
                {isEditing ? 'Editar persona' : 'Nueva persona'}
            </p>

            <h1 className="exercise-title">
                {isEditing ? 'Editar persona' : 'Agregar nueva persona'}
            </h1>

            {submitError && <Alert variant="danger">{submitError}</Alert>}

            <Card className="exercise-card">
                <Card.Body className="p-4 p-md-5">
                    <Form noValidate validated={formValidated} onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-4" controlId="firstName">
                                    <Form.Label className="fw-semibold">Nombre<span className="required-mark"> *</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ej.: Martina"
                                        value={person.firstName}
                                        minLength={2}
                                        onChange={(e) => setPerson({ ...person, firstName: e.target.value })}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">Ingresá un nombre válido.</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-4" controlId="lastName">
                                    <Form.Label className="fw-semibold">Apellido<span className="required-mark"> *</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ej.: Rodríguez"
                                        value={person.lastName}
                                        minLength={2}
                                        onChange={(e) => setPerson({ ...person, lastName: e.target.value })}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">Ingresá un apellido válido.</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-4" controlId="dni">
                                    <Form.Label className="fw-semibold">DNI<span className="required-mark"> *</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ej.: 38456789"
                                        value={person.dni}
                                        minLength={7}
                                        maxLength={8}
                                        pattern="[0-9]+"
                                        title="Solo números, sin puntos ni espacios"
                                        onChange={(e) => setPerson({ ...person, dni: e.target.value })}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">Ingresá un DNI válido (solo números).</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-4" controlId="role">
                                    <Form.Label className="fw-semibold">Rol de usuario<span className="required-mark"> *</span></Form.Label>
                                    <Form.Select
                                        value={person.role}
                                        onChange={(e) => setPerson({ ...person, role: e.target.value as Role })}
                                        required
                                    >
                                        <option value="paciente">Paciente</option>
                                        <option value="estudiante">Estudiante</option>
                                        <option value="docente">Docente</option>
                                        <option value="admin">Administrador</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-4" controlId="email">
                            <Form.Label className="fw-semibold">Email<span className="required-mark"> *</span></Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ej.: persona@email.com"
                                value={person.email}
                                onChange={(e) => setPerson({ ...person, email: e.target.value })}
                                required
                            />
                            <Form.Control.Feedback type="invalid">Ingresá un correo válido.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="nationality">
                            <Form.Label className="fw-semibold">Nacionalidad<span className="required-mark"> *</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej.: Argentina"
                                value={person.nationality}
                                onChange={(e) => setPerson({ ...person, nationality: e.target.value })}
                                required
                            />
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

function CreatePerson() {
    const { id } = useParams<{ id: string }>()
    const { persons, loading, error } = usePersons()

    const isEditing = Boolean(id)
    const existingPerson = isEditing
        ? persons.find((p) => p.id === Number(id))
        : undefined

    if (isEditing && loading) {
        return <section className="exercise-page"><p className="library-state">Cargando persona...</p></section>
    }

    if (isEditing && error) {
        return <section className="exercise-page"><p className="library-state library-state-error">{error}</p></section>
    }

    if (isEditing && !existingPerson) {
        return (
            <section className="exercise-page">
                <Alert variant="warning">No se encontró la persona solicitada.</Alert>
            </section>
        )
    }

    return (
        <PersonForm
            key={existingPerson?.id ?? 'new'}
            isEditing={isEditing}
            existingPerson={existingPerson}
        />
    )
}

export default CreatePerson;
