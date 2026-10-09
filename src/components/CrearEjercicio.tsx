import { useState, type FormEvent } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import type { Ejercicio } from "../types/ejercicio";

const ejercicioInicial: Ejercicio = {
    id: 0,
    name: "",
    bodyRegion: "",
    motionType: "",
    material: "",
    linkVideo: "",
    instructions: "",
};

function CrearEjercicio() {
    const [ejercicio, setEjercicio] = useState<Ejercicio>(ejercicioInicial);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {event.preventDefault();

    const nuevoEjercicio: Ejercicio = {...ejercicio, id: Date.now(),};

    console.log("Ejercicio creado:", nuevoEjercicio);

    setEjercicio(ejercicioInicial);
    };

    return (
        <Container className="py-5">
        <p className="text-secondary mb-2">Ejercicios / Nuevo ejercicio</p>

        <h1 className="fw-bold mb-4" style={{ color: '#176b4d' }}>Crear nuevo ejercicio</h1>

        <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 p-md-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="nombreEjercicio">
                <Form.Label className="fw-semibold">
                    Nombre del ejercicio *
                </Form.Label>

                <Form.Control
                    type="text"
                    placeholder="Ej.: Flexión cervical"
                    value={ejercicio.name}
                    onChange={(event) =>
                    setEjercicio({
                        ...ejercicio,
                        name: event.target.value,
                    })
                    }
                    required
                />
                </Form.Group>

                <Row>
                <Col md={6}>
                    <Form.Group className="mb-4" controlId="regionCorporal">
                    <Form.Label className="fw-semibold">
                        Región corporal *
                    </Form.Label>

                    <Form.Select
                        value={ejercicio.bodyRegion}
                        onChange={(event) =>
                        setEjercicio({
                            ...ejercicio,
                            bodyRegion: event.target.value,
                        })
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
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group className="mb-4" controlId="tipoMovimiento">
                    <Form.Label className="fw-semibold">
                        Tipo de movimiento *
                    </Form.Label>

                    <Form.Select
                        value={ejercicio.motionType}
                        onChange={(event) =>
                        setEjercicio({
                            ...ejercicio,
                            motionType: event.target.value,
                        })
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
                    </Form.Group>
                </Col>
                </Row>

                <Form.Group className="mb-4" controlId="material">
                <Form.Label className="fw-semibold">
                    Material o equipamiento
                </Form.Label>

                <Form.Control
                    type="text"
                    placeholder="Ej.: Colchoneta, banda elástica o silla"
                    value={ejercicio.material}
                    onChange={(event) =>
                    setEjercicio({
                        ...ejercicio,
                        material: event.target.value,
                    })
                    }
                />
                </Form.Group>

                <Form.Group className="mb-4" controlId="enlaceVideo">
                <Form.Label className="fw-semibold">
                    Enlace del vídeo de YouTube *
                </Form.Label>

                <Form.Control
                    type="url"
                    placeholder="Pegá aquí el enlace del vídeo"
                    value={ejercicio.linkVideo}
                    onChange={(event) =>
                    setEjercicio({
                        ...ejercicio,
                        linkVideo: event.target.value,
                    })
                    }
                    required
                />
                </Form.Group>

                <Form.Group className="mb-4" controlId="instrucciones">
                <Form.Label className="fw-semibold">
                    Instrucciones de ejecución *
                </Form.Label>

                <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Describí cómo debe realizarse el ejercicio"
                    value={ejercicio.instructions}
                    onChange={(event) =>
                    setEjercicio({
                        ...ejercicio,
                        instructions: event.target.value,
                    })
                    }
                    required
                />
                </Form.Group>

                <div className="d-flex justify-content-end gap-3">
                <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => setEjercicio(ejercicioInicial)}
                >
                    Cancelar
                </Button>

                <Button type="submit" variant="success">
                    Guardar ejercicio
                </Button>
                </div>
            </Form>
            </Card.Body>
        </Card>
        </Container>
    );
}

export default CrearEjercicio;
