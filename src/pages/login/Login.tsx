import { useState, type SubmitEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

import type { LoginCredentials } from '../../types/auth'
import { useAuth } from '../../context/useAuth'
import loginImage from '../../assets/login-imagen.png'
import './Login.css'

const initialCredentials: LoginCredentials = {
    email: '',
    password: '',
}

function Login() {
    const navigate = useNavigate()
    const { user, login } = useAuth()

    const [credentials, setCredentials] = useState<LoginCredentials>(initialCredentials)
    const [remember, setRemember] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formValidated, setFormValidated] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    if (user) return <Navigate to="/" replace />

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget

        if (!form.checkValidity()) {
            event.stopPropagation()
            setFormValidated(true)
            return
        }

        setError(null)
        setSubmitting(true)

        try {
            await login(credentials, remember)
            navigate('/', { replace: true })
        } catch {
            setError('Correo o contraseña incorrectos.')
            setSubmitting(false)
        }
    }

    return (
        <div className="login-page">
            <section className="login-panel">
                <div className="login-brand">
                    <div className="login-logo">RH</div>
                    <span className="login-brand-name">RehabHur</span>
                </div>

                <div className="login-content">
                    <h1 className="login-title">Bienvenido</h1>
                    <p className="login-subtitle">Accedé a tu panel clínico-paciente</p>

                    {error && <Alert variant="danger" className="login-alert">{error}</Alert>}

                    <Form noValidate validated={formValidated} onSubmit={handleSubmit} className="login-form">
                        <Form.Group className="mb-3" controlId="loginEmail">
                            <Form.Label className="login-label">Correo electrónico</Form.Label>
                            <div className="login-input">
                                <i className="bi bi-envelope login-input-icon" aria-hidden="true"></i>
                                <Form.Control
                                    type="email"
                                    placeholder="ejemplo@rehabhur.com"
                                    value={credentials.email}
                                    onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
                                    autoComplete="email"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingresá un correo válido.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="loginPassword">
                            <Form.Label className="login-label">Contraseña</Form.Label>
                            <div className="login-input">
                                <i className="bi bi-lock login-input-icon" aria-hidden="true"></i>
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={credentials.password}
                                    onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="login-toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                                </button>
                                <Form.Control.Feedback type="invalid">
                                    Ingresá tu contraseña.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        <Form.Check
                            type="checkbox"
                            id="rememberDevice"
                            label="Recordar este dispositivo"
                            checked={remember}
                            onChange={(event) => setRemember(event.target.checked)}
                            className="mb-4"
                        />

                        <button type="submit" className="login-submit" disabled={submitting}>
                            {submitting ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    Ingresando...
                                </>
                            ) : (
                                'Iniciar sesión'
                            )}
                        </button>
                    </Form>
                </div>

                <p className="login-footer">© {new Date().getFullYear()} RehabHur · Todos los derechos reservados</p>
            </section>

            <aside className="login-visual">
                <img src={loginImage} alt="" className="login-image" />
            </aside>
        </div>
    )
}

export default Login;