import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type PrivateRouteProps = {
  children: React.ReactNode;
  allowedRoles?: Array<'admin' | 'administrativo' | 'bodega' | 'cliente'>;
  redirectTo?: string;
};

export function PrivateRoute({ children, allowedRoles, redirectTo = '/login' }: PrivateRouteProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || (allowedRoles && !allowedRoles.includes(user.role)))) {
      navigate(redirectTo);
    }
  }, [user, loading, navigate, allowedRoles, redirectTo]);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!user) {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
