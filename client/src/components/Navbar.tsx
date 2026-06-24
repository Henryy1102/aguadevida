import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="brand-mark">
          <img className="brand-logo" src="/logo.jpeg" alt="Logo Agua de Vida" />
          <h1 className="navbar-brand">Agua de Vida</h1>
        </div>
        {user && (
          <div className="navbar-user">
            <span>{user.firstName} {user.lastName}</span>
            <span className="role-badge">{user.role}</span>
            <button onClick={handleLogout} className="btn-logout">
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
