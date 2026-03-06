import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireAuth = true, allowedTypes = [] }) {
  const { user, userType, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-gray-500">
        Loading...
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedTypes.length > 0 && user && !allowedTypes.includes(userType)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
