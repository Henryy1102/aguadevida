import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../lib/api';

type Product = {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  stockMin: number;
  image: string | null;
  status: string;
  lowStock: boolean;
  outOfStock: boolean;
};

type ProductFormState = {
  name: string;
  description: string;
  price: string;
  stock: string;
  image: string | null;
  status: 'active' | 'inactive';
};

const emptyForm: ProductFormState = {
  name: '',
  description: '',
  price: '',
  stock: '',
  image: null,
  status: 'active'
};

export function ProductList() {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadProducts = async () => {
    try {
      const response = await apiClient.get('/inventory/products');
      setProducts(response.data.products || []);
    } catch {
      setProducts([]);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingProductId(null);
    setFeedback('');
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await loadProducts();
      setLoading(false);
    };

    void fetchData();
  }, []);

  const handleEdit = (product: Product) => {
    setEditingProductId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      stock: String(product.stock),
      image: product.image ?? null,
      status: product.status === 'inactive' ? 'inactive' : 'active'
    });
    setFeedback('');
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        setForm((current) => ({ ...current, image: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = async (productId: string) => {
    if (!window.confirm('¿Deseas eliminar este producto?')) {
      return;
    }

    try {
      await apiClient.delete(`/inventory/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await loadProducts();
      if (editingProductId === productId) {
        resetForm();
      }
    } catch {
      setFeedback('No se pudo eliminar el producto.');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFeedback('');

    const normalizedName = form.name.trim();
    const normalizedDescription = form.description.trim() || 'Sin descripción';
    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!normalizedName || Number.isNaN(price) || Number.isNaN(stock)) {
      setFeedback('Completa nombre, precio y stock para guardar.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: normalizedName,
        description: normalizedDescription,
        price,
        stock,
        stockMin: 0,
        image: form.image,
        status: form.status
      };

      if (editingProductId) {
        await apiClient.patch(`/inventory/products/${editingProductId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await apiClient.post(
          '/inventory/products',
          {
            ...payload,
            code: normalizedName.toLowerCase().replace(/\s+/g, '-').slice(0, 16),
            category: 'default-category',
            featured: false
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
      }

      await loadProducts();
      resetForm();
    } catch {
      setFeedback('No se pudo guardar el producto. Revise los datos e intente nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div className="product-list">
      <div className="product-list-header">
        <div>
          <h2>Productos</h2>
          <p className="product-list-subtitle">Administra el catálogo completo de productos desde aquí.</p>
        </div>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="product-form-header">
          <h3>{editingProductId ? 'Editar producto' : 'Agregar producto'}</h3>
          {editingProductId ? (
            <button className="product-action-btn secondary" type="button" onClick={resetForm}>
              Cancelar
            </button>
          ) : null}
        </div>

        {feedback ? <div className="product-feedback">{feedback}</div> : null}

        <div className="product-form-grid">
          <label>
            Nombre
            <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} required />
          </label>
          <label>
            Precio
            <input type="number" min="0" step="0.01" value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} required />
          </label>
          <label>
            Stock
            <input type="number" min="0" step="1" value={form.stock} onChange={(event) => setForm((current) => ({ ...current, stock: event.target.value }))} required />
          </label>
          <label>
            Estado
            <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as 'active' | 'inactive' }))}>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </label>
          <label>
            Descripción
            <textarea rows={3} value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} required />
          </label>
        </div>

        <div className="product-image-field">
          <label htmlFor="product-image-input">Imagen del producto</label>
          <input id="product-image-input" type="file" accept="image/*" onChange={handleImageChange} />
          {form.image ? (
            <div className="image-preview-box">
              <img src={form.image} alt="Vista previa del producto" />
            </div>
          ) : null}
        </div>

        <div className="product-form-actions">
          <button className="btn-primary" type="submit" disabled={submitting}>
            {submitting ? 'Guardando...' : editingProductId ? 'Guardar cambios' : 'Crear producto'}
          </button>
        </div>
      </form>

      {products.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className={product.outOfStock ? 'out-of-stock' : product.lowStock ? 'low-stock' : ''}>
                <td>{product.code}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>{product.status}</td>
                <td>
                  <div className="product-actions">
                    <button className="product-action-btn" type="button" onClick={() => handleEdit(product)}>
                      Editar
                    </button>
                    <button className="product-action-btn delete" type="button" onClick={() => handleDelete(product.id)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
