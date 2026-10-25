import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home' 
import CreateExercise from './pages/exercise/CreateExercise' 
import ExerciseList from './pages/exercise/ExerciseList' 
import NotFound from './components/NotFound'
import AppLayout from './components/layout/AppLayout'
import PersonList from './pages/person/PersonList'
import CreatePerson from './pages/person/CreatePerson'

function App() {
    return (
        <AppLayout>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/exercises" element={<ExerciseList />} />
                <Route path="/exercises/new" element={<CreateExercise />} />
                <Route path="/exercises/:id/edit" element={<CreateExercise />} />


                <Route path="/persons" element={<PersonList />} />
                <Route path="/persons/new" element={<CreatePerson />} />
                <Route path="/persons/:id/edit" element={<CreatePerson />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </AppLayout>
    )
}

export default App;