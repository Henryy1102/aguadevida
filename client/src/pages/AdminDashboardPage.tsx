import { Navbar } from '../components/Navbar';
import { ProductList } from '../components/ProductList';
import { adminKpis, quickActions } from '../content';
import { useAuth } from '../context/AuthContext';

export function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <Navbar />
      <main className="dashboard-content">
        <section className="dashboard-hero">
          <div className="hero-brand-block">
            <img className="hero-logo" src="/logo.jpeg" alt="Logo Agua de Vida" />
            <p className="eyebrow">Dashboard administrativo</p>
            <h1>Bienvenido{user ? `, ${user.firstName}` : ''}</h1>
            <p className="lead">Resumen general para controlar inventario, ventas, clientes, facturación y operaciones de Agua de Vida.</p>
          </div>
          <div className="dashboard-role-card">
            <span>Rol activo</span>
            <strong>{user?.role ?? 'admin'}</strong>
          </div>
        </section>

        <section className="kpi-grid">
          {adminKpis.map((kpi) => (
            <article key={kpi.label} className="kpi-card">
              <p>{kpi.label}</p>
              <strong>{kpi.value}</strong>
              <span>{kpi.hint}</span>
            </article>
          ))}
        </section>

        <section className="dashboard-section">
          <div className="section-heading">
            <p className="eyebrow">Acciones rápidas</p>
            <h2>Operaciones frecuentes de la empresa</h2>
          </div>
          <div className="actions-grid">
            {quickActions.map((action) => (
              <button key={action} className="action-card" type="button">
                {action}
              </button>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <ProductList />
        </section>
      </main>
    </div>
  );
}