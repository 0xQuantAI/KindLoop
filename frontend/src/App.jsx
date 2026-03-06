import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import VolunteerSignup from './pages/VolunteerSignup';
import OrganizationSignup from './pages/OrganizationSignup';
import VolunteerDashboard from './pages/VolunteerDashboard';
import OrganizationDashboard from './pages/OrganizationDashboard';
import OpportunityBoard from './pages/OpportunityBoard';
import OpportunityDetail from './pages/OpportunityDetail';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/volunteer/signup" element={<VolunteerSignup />} />
            <Route path="/org/signup" element={<OrganizationSignup />} />
            <Route path="/opportunities" element={<OpportunityBoard />} />
            <Route path="/opportunities/:id" element={<OpportunityDetail />} />
            <Route
              path="/volunteer/dashboard"
              element={
                <ProtectedRoute allowedTypes={['volunteer']}>
                  <VolunteerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/org/dashboard"
              element={
                <ProtectedRoute allowedTypes={['organization']}>
                  <OrganizationDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedTypes={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
