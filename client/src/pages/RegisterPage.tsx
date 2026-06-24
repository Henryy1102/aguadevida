import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function getLandingPath(role: 'admin' | 'administrativo' | 'bodega' | 'cliente') {
  return role === 'cliente' ? '/portal' : '/dashboard';
}

export function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [identification, setIdentification] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const user = await register({
        firstName,
        lastName,
        identification,
        email,
        phone,
        address,
        password,
        role: 'cliente'
      });

      if (user?.role === 'cliente') {
        navigate('/portal');
      } else {
        navigate(getLandingPath(user.role));
      }
    } catch (registerError) {
      setError(registerError instanceof Error ? registerError.message : 'No se pudo registrar el usuario');
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
            <Link className="auth-topbar-link" to="/login">
              Iniciar sesión
            </Link>
          </div>
        </div>

        <div className="login-card register-card">
          <div className="auth-card-head">
            <img className="page-logo" src="/logo.jpeg" alt="Logo Agua de Vida" />
            <div>
              <h1>Crear cuenta</h1>
              <p className="subtitle">Tu acceso a pedidos y facturas</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}

            <div className="form-row">
              <div className="form-group">
                <label>Nombre</label>
                <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} required />
              </div>
              <div className="form-group">
                <label>Apellido</label>
                <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Cédula</label>
                <input type="text" value={identification} onChange={(event) => setIdentification(event.target.value)} required />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input type="text" value={phone} onChange={(event) => setPhone(event.target.value)} required />
              </div>
            </div>

            <div className="form-group">
              <label>Correo electrónico</label>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>

            <div className="form-group">
              <label>Dirección</label>
              <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Contraseña</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              </div>
              <div className="form-group">
                <label>Confirmar contraseña</label>
                <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Creando cuenta...' : 'Registrarse'}
            </button>
          </form>

          <p className="demo-info">
            ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}