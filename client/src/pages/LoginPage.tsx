import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function getLandingPath(role: 'admin' | 'administrativo' | 'bodega' | 'cliente') {
  return role === 'cliente' ? '/portal' : '/dashboard';
}

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password);
      navigate(getLandingPath(user.role));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="auth-shell">
        <div className="auth-topbar">
          <Link className="auth-brand" to="/">
            Agua de Vida
          </Link>
          <div className="auth-topbar-actions">
            <Link className="auth-topbar-link" to="/">
              Inicio
            </Link>
            <Link className="auth-topbar-link" to="/register">
              Registrarse
            </Link>
          </div>
        </div>

        <div className="login-card">
          <div className="auth-card-head">
            <img className="page-logo" src="/logo.jpeg" alt="Logo Agua de Vida" />
            <div>
              <h1>Agua de Vida</h1>
              <p className="subtitle">Acceso seguro</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Correo electrónico</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </button>
          </form>

          <p className="demo-info">
            <strong>Demo:</strong> Si aún no tienes cuenta, puedes <Link to="/register">registrarte aquí</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
