import { Routes, Route, Navigate } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import CreateProfile from './pages/CreateProfile';
import EditProfile from './pages/EditProfile';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/profile/demo" replace />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/users/create" element={<CreateProfile />} />
            <Route path="/admin/users/:id/edit" element={<EditProfile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
