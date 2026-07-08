import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../lib/api';

export function ProductCreatePage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        setImagePreview(result);
        setImageData(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFeedback('');

    const normalizedName = name.trim();
    const normalizedDescription = description.trim() || 'Sin descripción';

    if (!normalizedName || !price || !stock) {
      setFeedback('Complete nombre, precio y stock para guardar el producto.');
      return;
    }

    setSaving(true);

    try {
      await apiClient.post(
        '/inventory/products',
        {
          code: normalizedName.toLowerCase().replace(/\s+/g, '-').slice(0, 16),
          name: normalizedName,
          description: normalizedDescription,
          category: 'default-category',
          price: Number(price),
          stock: Number(stock),
          stockMin: 0,
          image: imageData,
          featured: false,
          status: 'active'
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      navigate('/dashboard');
    } catch {
      setFeedback('No se pudo crear el producto. Revise los datos e intente nuevamente.');
      setSaving(false);
    }
  };

  return (
    <main className="shell product-create-shell">
      <div className="product-create-card">
        <div className="product-create-header">
          <div>
            <p className="eyebrow">Inventario</p>
            <h1>Crear producto</h1>
            <p className="lead">Completa los datos del producto y agrega una foto si deseas que se vea en el catálogo.</p>
          </div>
          <Link className="btn-secondary hero-button" to="/dashboard">
            Volver
          </Link>
        </div>

        <form className="product-create-form" onSubmit={handleSubmit}>
          {feedback && <div className="product-feedback">{feedback}</div>}

          <div className="product-create-grid">
            <label>
              Nombre del producto
              <input value={name} onChange={(event) => setName(event.target.value)} required />
            </label>
            <label>
              Precio
              <input type="number" min="0" step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} required />
            </label>
            <label>
              Stock
              <input type="number" min="0" step="1" value={stock} onChange={(event) => setStock(event.target.value)} required />
            </label>
          </div>

          <label>
            Descripción
            <textarea rows={4} value={description} onChange={(event) => setDescription(event.target.value)} required />
          </label>

          <div className="product-image-field">
            <label htmlFor="product-image-input">Imagen del producto</label>
            <input id="product-image-input" type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <div className="image-preview-box">
                <img src={imagePreview} alt="Vista previa del producto" />
              </div>
            )}
          </div>

          <div className="product-form-actions">
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar producto'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
