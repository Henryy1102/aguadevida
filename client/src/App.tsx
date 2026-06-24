import { Link, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { CustomerPortalPage } from './pages/CustomerPortalPage';
import { ProductCreatePage } from './pages/ProductCreatePage';
import { CartPage } from './pages/CartPage';
import { PrivateRoute } from './components/PrivateRoute';
import { companySections, contactInfo, serviceItems, stackItems, systemModules, userRoles } from './content';

function getLandingPath(role: 'admin' | 'administrativo' | 'bodega' | 'cliente') {
  return role === 'cliente' ? '/portal' : '/dashboard';
}

function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleContinue = () => {
    if (!user) {
      navigate('/register');
      return;
    }

    navigate(getLandingPath(user.role));
  };

  return (
    <main className="shell company-shell home-page">
      <header className="home-topbar">
        <div className="brand-mark home-brand">
          <img className="brand-logo brand-logo-lg" src="/logo.jpeg" alt="Logo Agua de Vida" />
          <div>
            <p className="eyebrow eyebrow-tight">Agua de Vida</p>
            <span className="topbar-caption">Pureza que nutre, vida que fluye.</span>
          </div>
        </div>
        <div className="topbar-actions">
          <Link className="btn-secondary hero-button" to="/login">
            Iniciar sesión
          </Link>
          <Link className="btn-primary hero-button" to="/register">
            Registrarse
          </Link>
        </div>
      </header>

      <section className="hero hero-split">
        <div className="hero-copy">
          <p className="eyebrow">La mejor agua purificada y ozonificada del centro del país</p>
          <h1>Haz tu orden en 3 pasos</h1>
          <p className="lead">
            Una experiencia clara, rápida y moderna para clientes y visitantes, con acceso directo a pedidos, catálogo y atención empresarial.
          </p>
          <div className="hero-actions">
            <Link className="btn-primary hero-button" to="/register">
              Empezar ahora
            </Link>
            <a className="btn-secondary hero-button" href="#pasos">
              Ver cómo funciona
            </a>
          </div>
        </div>

        <aside className="hero-card order-card">
          <div className="order-card-header">
            <img className="hero-logo" src="/logo.jpeg" alt="Logo Agua de Vida" />
            <span>Pedido rápido</span>
          </div>
          <div className="order-summary">
            <div>
              <strong>Botellón Aprox. 20 Litros</strong>
              <p>$2.25</p>
            </div>
            
          </div>
          <div className="order-field">
            <label>Instrucciones adicionales</label>
            <div className="order-input">En caso lo necesites</div>
          </div>
          <button className="btn-primary order-button" type="button" onClick={handleContinue}>
            Continuar
          </button>
        </aside>
      </section>

      <section className="section" id="pasos">
        <div className="section-heading">
          <p className="eyebrow">Paso a paso</p>
          <h2>Solicita tu agua en pocos clics</h2>
        </div>
        <div className="steps-grid">
          <article className="step-card">
            <span>01</span>
            <h3>Selecciona tus productos</h3>
            <p>Escoge botellones, complementos y productos disponibles en el catálogo de Agua de Vida.</p>
          </article>
          <article className="step-card">
            <span>02</span>
            <h3>Completa tu pedido</h3>
            <p>Agrega datos, instrucciones y dirección de entrega para preparar tu orden correctamente.</p>
          </article>
          <article className="step-card">
            <span>03</span>
            <h3>Confirma y recibe</h3>
            <p>Finaliza la solicitud, recibe seguimiento y consulta tus facturas e historial desde tu cuenta.</p>
          </article>
        </div>
      </section>

      

    </main>

  );
}

export default function App() {
  const { user } = useAuth();
  const landingPath = user ? getLandingPath(user.role) : '/';

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={landingPath} /> : <HomePage />} />
      <Route path="/login" element={user ? <Navigate to={landingPath} /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to={landingPath} /> : <RegisterPage />} />
      <Route
        path="/portal"
        element={
          <PrivateRoute allowedRoles={['cliente']} redirectTo="/login">
            <CustomerPortalPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute allowedRoles={['admin', 'administrativo']} redirectTo="/portal">
            <AdminDashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/products/new"
        element={
          <PrivateRoute allowedRoles={['admin', 'administrativo']} redirectTo="/portal">
            <ProductCreatePage />
          </PrivateRoute>
        }
      />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}
