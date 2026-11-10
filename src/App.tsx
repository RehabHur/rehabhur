import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home' 
import CreateExercise from './pages/exercise/CreateExercise' 
import ExerciseList from './pages/exercise/ExerciseList' 
import NotFound from './components/NotFound'
import PersonList from './pages/person/PersonList'
import CreatePerson from './pages/person/CreatePerson'
import Login from './pages/login/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />

                <Route path="/exercises" element={<ExerciseList />} />
                <Route path="/exercises/new" element={<CreateExercise />} />
                <Route path="/exercises/:id/edit" element={<CreateExercise />} />


                <Route path="/persons" element={<PersonList />} />
                <Route path="/persons/new" element={<CreatePerson />} />
                <Route path="/persons/:id/edit" element={<CreatePerson />} />

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default App;