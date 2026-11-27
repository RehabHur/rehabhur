import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { usePersons } from '../../context/usePersons'
import { getCommissions } from '../../services/commissionService'
import type { Commission } from '../../types/commision'
import './CommissionList.css'

function CommissionList() {
    const navigate = useNavigate()
    const { persons } = usePersons()
    
    
    const [commissions, setCommissions] = useState<Commission[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<string>('')

    useEffect(() => {
        async function load() {
            try {
                const data = await getCommissions()
                setCommissions(data)
                if (data.length > 0) setActiveTab(data[0].id.toString())
            } catch (error) {
                console.error('Error al cargar comisiones', error)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    // Filtramos a los estudiantes (por ahora los mostramos a todos en cada comisión)
    const allStudents = persons.filter(p => p.role === 'estudiante')

    if (loading) return <p className="library-state">Cargando comisiones...</p>

    return (
        <section className="exercise-page">
            <header className="home-header mb-4">
                <div>
                    <h1 className="exercise-title">Mis Comisiones</h1>
                    <p className="home-subtitle">Seleccioná una comisión para ver los estudiantes a cargo.</p>
                </div>
            </header>

            {commissions.length === 0 ? (
                <p className="text-muted">No hay comisiones creadas.</p>
            ) : (
                <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k || '')}
                    className="mb-4 custom-tabs"
                >
                    {commissions.map((commission) => (
                        <Tab 
                            eventKey={commission.id.toString()} 
                            title={commission.name} 
                            key={commission.id}
                        >
                            {/* Mostramos info extra de la comisión */}
                            <div className="commission-info mb-3">
                                <span className="badge bg-light text-dark border me-2">Año {commission.year}</span>
                                <span className="badge bg-light text-dark border me-2">{commission.turno}</span>
                                <span className="badge bg-light text-dark border">{commission.cuatrimestre}° Cuatrimestre</span>
                            </div>

                            <div className="commission-students-grid mt-4">
                                {allStudents.map((student) => (
                                    <div 
                                        key={student.id} 
                                        className="student-card"
                                        onClick={() => navigate(`/commissions/${commission.id}/student/${student.id}`)}
                                    >
                                        <div className="person-avatar">
                                            {student.firstName[0]}{student.lastName[0]}
                                        </div>
                                        <div className="student-info">
                                            <h3 className="student-name">{student.firstName} {student.lastName}</h3>
                                            <p className="student-meta">DNI {student.dni}</p>
                                            <p className="student-meta">{student.email}</p>
                                        </div>
                                        <div className="student-action">
                                            <i className="bi bi-chevron-right"></i>
                                        </div>
                                    </div>
                                ))}
                                {allStudents.length === 0 && (
                                    <p className="text-muted">No hay estudiantes en la base de datos.</p>
                                )}
                            </div>
                        </Tab>
                    ))}
                </Tabs>
            )}
        </section>
    )
}

export default CommissionList;