import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function CartPage() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();

  return (
    <main className="shell cart-shell">
      <div className="cart-card">
        <div className="cart-header">
          <div>
            <p className="eyebrow">Carrito</p>
            <h1>Tu pedido</h1>
          </div>
          <Link className="btn-secondary hero-button" to="/portal">
            Volver
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">Tu carrito está vacío.</div>
        ) : (
          <>
            <div className="cart-list">
              {items.map((item) => (
                <div key={item.product.id} className="cart-item">
                  <div className="cart-item-info">
                    {item.product.image && <img src={item.product.image} alt={item.product.name} />}
                    <div>
                      <h3>{item.product.name}</h3>
                      <p>{item.product.description}</p>
                      <strong>${item.product.price.toFixed(2)}</strong>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <input
                      type="number"
                      min="1"
                      max={item.product.stock}
                      value={item.quantity}
                      onChange={(event) => updateQuantity(item.product.id, Number(event.target.value))}
                    />
                    <button className="btn-secondary" type="button" onClick={() => removeItem(item.product.id)}>
                      Quitar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <strong>Total:</strong> ${total.toFixed(2)}
              </div>
              <div className="cart-summary-actions">
                <button className="btn-secondary" type="button" onClick={clearCart}>
                  Vaciar carrito
                </button>
                <button className="btn-primary" type="button">
                  Confirmar pedido
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
