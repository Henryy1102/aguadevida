import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../lib/api';
import { companySections, contactInfo, serviceItems } from '../content';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

type Product = {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  stockMin: number;
  status: string;
  lowStock: boolean;
  outOfStock: boolean;
  image?: string | null;
};

export function CustomerPortalPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { count, addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    apiClient
      .get('/inventory/products')
      .then((response) => {
        setProducts(response.data.products || []);
      })
      .catch(() => {
        setProducts([]);
      })
      .finally(() => {
        setLoadingProducts(false);
      });
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <main className="shell company-shell">
      <section className="hero customer-hero compact-header">
        <div className="compact-header-left">
          <img className="hero-logo" src="/logo.jpeg" alt="Logo Agua de Vida" />
          <div>
            <p className="eyebrow">Portal del cliente</p>
            <h1>Bienvenido{user ? `, ${user.firstName}` : ''}</h1>
          </div>
        </div>
        <div className="hero-actions compact-header-actions">
          <Link className="btn-secondary hero-button" to="/cart">
            🛒 Carrito ({count})
          </Link>
          <Link className="btn-secondary hero-button" to="/register">
            Crear cuenta
          </Link>
          <Link className="btn-secondary hero-button" to="/login">
            Cambiar usuario
          </Link>
          <button className="btn-logout hero-button" type="button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </section>

      <section className="section compact-catalog-section">
        <div className="section-heading compact-catalog-heading">
          <p className="eyebrow">Catálogo</p>
          <h2>Productos</h2>
        </div>

        {loadingProducts ? (
          <div className="catalog-loading">Cargando catálogo...</div>
        ) : products.length === 0 ? (
          <div className="catalog-empty">Aún no hay productos publicados para mostrar.</div>
        ) : (
          <div className="catalog-preview">
            {products.slice(0, 4).map((product) => (
              <article key={product.id} className="catalog-card compact-card">
                <div className="catalog-card-top">
                  <span className={`catalog-pill ${product.outOfStock ? 'pill-out' : product.lowStock ? 'pill-low' : 'pill-ready'}`}>
                    {product.outOfStock ? 'Agotado' : product.lowStock ? 'Poco stock' : 'Disponible'}
                  </span>
                </div>
                {product.image && <img className="catalog-image" src={product.image} alt={product.name} />}
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="catalog-footer">
                  <strong>${product.price.toFixed(2)}</strong>
                  <span>Stock: {product.stock}</span>
                </div>
                <button className="btn-primary cart-button" type="button" onClick={() => addItem({ id: product.id, name: product.name, description: product.description, price: product.price, stock: product.stock, image: product.image })}>
                  Agregar al carrito
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Servicios para clientes</p>
          <h2>Todo lo que podrás usar como cliente registrado</h2>
        </div>
        <div className="info-grid">
          {serviceItems.map((service) => (
            <article key={service} className="card info-card">
              <h3>{service}</h3>
              <p>Acceso pensado para compras, soporte y seguimiento comercial.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-grid">
        <article className="card info-card">
          <div className="section-heading compact">
            <p className="eyebrow">Mi cuenta</p>
            <h2>Datos y beneficios</h2>
          </div>
          <ul>
            <li>Ver catálogo de productos</li>
            <li>Comprar en línea</li>
            <li>Consultar historial de compras</li>
            <li>Descargar facturas</li>
            <li>Editar perfil</li>
          </ul>
        </article>

        <article className="card info-card">
          <div className="section-heading compact">
            <p className="eyebrow">Contacto</p>
            <h2>Canales de atención</h2>
          </div>
          <ul>
            {contactInfo.map((item) => (
              <li key={item.label}>
                <strong>{item.label}:</strong> {item.value}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Empresa</p>
          <h2>Información institucional</h2>
        </div>
        <div className="info-grid">
          {companySections.map((section) => (
            <article key={section.title} className="card info-card">
              <h3>{section.title}</h3>
              <p>{section.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}