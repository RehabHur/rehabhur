import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import CreateExercise from './pages/CreateExercise'
import ExerciseList from './pages/ExerciseList'
import NotFound from './components/NotFound'
import AppLayout from './components/layout/AppLayout'

function App() {
    return (
        <AppLayout>
            <Routes>
                {/* TODO: cuando exista el panel, reemplazar por <Home /> */}
                <Route path="/" element={<Navigate to="/exercises" replace />} />

                <Route path="/exercises" element={<ExerciseList />} />
                <Route path="/exercises/new" element={<CreateExercise />} />
                <Route path="/exercises/:id/edit" element={<CreateExercise />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </AppLayout>
    )
}

export default App;

