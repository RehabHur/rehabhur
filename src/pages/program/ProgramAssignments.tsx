import { useNavigate } from "react-router-dom"
import { usePrograms } from "../../context/usePrograms"
import { usePersons } from "../../context/usePersons"
import { useState } from "react"
import type { PatientAssignment } from "../../types/program"
import type { Person } from "../../types/person"
import Alert from "react-bootstrap/Alert"
import './ProgramAssignments.css'
import { assignPatientToProgram, removePatientFromProgram } from "../../services/programService"
import { getErrorMessage } from "../../services/http"
import { Icon } from "../../components/Icon"

function ProgramAssignments() {
    const navigate = useNavigate()
    const { programs, setPrograms, loading: programsLoading, error: programsError } = usePrograms()
    const { persons, loading: personsLoading, error: personsError } = usePersons()

    const [searchPatient, setSearchPatient] = useState('')
    const [selectedPatient, setSelectedPatient] = useState<PatientAssignment | null>(null)
    const [selectedProgram, setSelectedProgram] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)


    const patients = persons.filter(p => p.role === 'paciente')

    const filteredPatients = patients.filter(p =>
        p.firstName.toLowerCase().includes(searchPatient.toLowerCase()) ||
        p.lastName.toLowerCase().includes(searchPatient.toLowerCase()) ||
        p.dni.includes(searchPatient) ||
        p.email.toLowerCase().includes(searchPatient.toLowerCase())
    )


    const handleSelectPatient = (patient: Person) => {
        setSelectedPatient({
            patientId: patient.id,
            patientName: `${patient.firstName} ${patient.lastName}`,
            dni: patient.dni
        })
        setError(null)
    }

    const handleAssign = async () => {
        if(!selectedPatient) {
            setError ('Primero seleccioná un paciente de la izquierda.')
            return
        }
        if(selectedProgram === null) {
            setError ('Seleccioná un programa de la derecha para asignar')
            return
        }

        const programToUpdate = programs.find(p => p.id === selectedProgram)
        if (programToUpdate?.assignedPatients.some(p => p.patientId === selectedPatient.patientId)) {
            setError('Este paciente ya está asignado a este programa.')
            return
        }

        try {
            setError(null)
            await assignPatientToProgram(selectedProgram, selectedPatient)

            setPrograms(prevPrograms => 
                prevPrograms.map(prog => {
                    if (prog.id !== selectedProgram) return prog
                    return {...prog, assignedPatients: [...prog.assignedPatients, selectedPatient]}
                })
            )

            alert('Paciente asignado correctamente')
            setSelectedPatient(null)
            setSelectedProgram(null)
            setError(null)
            
        } catch (error) {
            setError(getErrorMessage(error, 'No se pudo asignar el paciente.'))
        }
    }

    const handleRemovePatient = async (programId: number, patientId: number) => {
        try {
            await removePatientFromProgram(programId, patientId)
            
            setPrograms(prevPrograms => 
                prevPrograms.map(prog => {
                    if (prog.id === programId) {
                        return {...prog, assignedPatients: prog.assignedPatients.filter(p => p.patientId !== patientId)}
                    }
                    return prog
                })
            )
        } catch (error) {
            setError(getErrorMessage(error, 'No se pudo quitar al paciente.'))
        }
    }

    return(
        <section className="exercise-page">
            <header className="home-header mb-4">
                <div>
                    <h1 className="exercise-title">Asignaciones de programas</h1>
                    <p className="home-subtitle">Vinculá los programas necesarios a los pacientes correspondientes.</p>
                </div>
            </header>

            {(programsLoading || personsLoading) && <p className="library-state">Cargando datos...</p>}
            {(programsError || personsError) && (
                <Alert variant="danger">{programsError ?? personsError}</Alert>
            )}
            {error && <p className="text-danger mb-3">{error}</p>}

            {!programsLoading && !personsLoading && !programsError && !personsError && (
            <div className="assignments-grid">
                <div className="assignment-card">
                    <h3 className="widget-title mb-3">Nueva asignación</h3>
                    <p className="text-muted small mb-2">Paciente</p>
                    
                    <div className="library-search mb-3">
                        <Icon name="search" className="library-search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, email o DNI..."
                            value={searchPatient}
                            onChange={(e) => setSearchPatient(e.target.value)}
                        />
                    </div>

                    <div className="patients-list">
                        {filteredPatients.map(p => (
                            <div 
                                key={p.id} 
                                className={`patient-item ${selectedPatient?.patientId === p.id ? 'selected' : ''}`}
                                onClick={() => handleSelectPatient(p)}
                            >
                                <div className="person-avatar" style={{ width: 32, height: 32, fontSize: 11 }}>
                                    {p.firstName[0]}{p.lastName[0]}
                                </div>
                                <div className="patient-info">
                                    <span className="fw-semibold text-dark">{p.firstName} {p.lastName}</span>
                                    <span className="text-muted small">DNI {p.dni}</span>
                                </div>
                                <span className="patient-status">
                                    {selectedPatient?.patientId === p.id ? 'Seleccionado' : 'Aceptar'}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="d-flex gap-2 mt-4">
                        <button className="btn btn-outline-secondary" onClick={() => navigate('/programs')}>Cancelar</button>
                        <button className="btn btn-success" onClick={handleAssign}>Guardar</button>
                    </div>
                </div>


                <div className="assignment-card">
                    <h3 className="widget-title mb-3">Programas vigentes</h3>
                    <p className="text-muted small mb-3">{programs.length} programas activos</p>

                    <div className="programs-assign-list">
                        {programs.map(program => (
                            <div key={program.id} className="program-assign-item">
                                <div 
                                    className="program-header-row"
                                    onClick={() => setSelectedProgram(program.id === selectedProgram ? null : program.id)}
                                >
                                    <input 
                                        type="radio" 
                                        name="programSelect" 
                                        checked={selectedProgram === program.id}
                                        onChange={() => setSelectedProgram(program.id)}
                                        //readOnly
                                        className="me-2"
                                    />
                                    <div className="flex-grow-1">
                                        <p className="fw-bold text-dark mb-0">{program.name}</p>
                                        <p className="text-muted small mb-0">Creado por: {program.createdBy}</p>
                                    </div>
                                    <span className="badge bg-light text-dark border">
                                        {program.assignedPatients.length} asignados
                                    </span>
                                </div>


                                {program.assignedPatients.length > 0 && (
                                    <div className="assigned-patients">
                                        <p className="text-muted small mb-1 mt-2">Pacientes asignados:</p>
                                        {program.assignedPatients.map(ap => (
                                            <div key={ap.patientId} className="assigned-patient-row">
                                                <div className="person-avatar" style={{ width: 24, height: 24, fontSize: 9 }}>
                                                    {ap.patientName[0]}
                                                </div>
                                                <span className="text-dark small">{ap.patientName}</span>
                                                <button className="btn-remove-patient" title="Quitar" aria-label={`Quitar a ${ap.patientName}`} onClick={() => handleRemovePatient(program.id, ap.patientId)}>
                                                    <Icon name="x-lg" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            )}
        </section>
    )
}

export default ProgramAssignments;