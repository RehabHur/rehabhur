import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import AppLayout from './layout/AppLayout'

function ProtectedRoute() {
    const { user } = useAuth()

    if (!user) return <Navigate to="/login" replace />

    return (
        <AppLayout>
            <Outlet />
        </AppLayout>
    )
}

export default ProtectedRoute;