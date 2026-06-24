export type ModuleStatus = 'planned' | 'scaffolded' | 'active';

export type BusinessModule = {
  id: string;
  name: string;
  description: string;
  status: ModuleStatus;
};

export const businessModules: BusinessModule[] = [
  { id: 'auth', name: 'Autenticación', description: 'Registro, inicio de sesión y recuperación de contraseña.', status: 'scaffolded' },
  { id: 'users', name: 'Usuarios', description: 'Administración de cuentas, roles y permisos.', status: 'planned' },
  { id: 'employees', name: 'Empleados', description: 'Gestión de personal y cargos.', status: 'planned' },
  { id: 'customers', name: 'Clientes', description: 'Perfiles, historial y administración comercial.', status: 'planned' },
  { id: 'inventory', name: 'Inventario', description: 'Productos, stock, entradas, salidas y alertas.', status: 'planned' },
  { id: 'categories', name: 'Categorías', description: 'Clasificación y organización del catálogo.', status: 'planned' },
  { id: 'catalog', name: 'Catálogo', description: 'Visualización pública de productos y filtros.', status: 'planned' },
  { id: 'cart', name: 'Carrito', description: 'Gestión de cantidades y totales de compra.', status: 'planned' },
  { id: 'ecommerce', name: 'Ventas en línea', description: 'Pedidos, confirmaciones y seguimiento.', status: 'planned' },
  { id: 'pos', name: 'Punto de venta', description: 'Ventas presenciales y tickets.', status: 'planned' },
  { id: 'billing', name: 'Facturación', description: 'Facturas, descarga PDF y consulta.', status: 'planned' },
  { id: 'reports', name: 'Reportes', description: 'Ventas, inventario y análisis de clientes.', status: 'planned' },
  { id: 'notifications', name: 'Notificaciones', description: 'Alertas operativas y avisos administrativos.', status: 'planned' },
  { id: 'orders', name: 'Pedidos y entregas', description: 'Estados, rutas y despacho.', status: 'planned' },
  { id: 'audit', name: 'Auditoría', description: 'Bitácora y seguimiento de actividades.', status: 'planned' },
  { id: 'dashboard', name: 'Dashboard', description: 'Indicadores clave y resumen del negocio.', status: 'planned' },
  { id: 'settings', name: 'Configuración', description: 'Datos de empresa, impuestos y parámetros.', status: 'planned' },
  { id: 'permissions', name: 'Roles y permisos', description: 'Control de acceso por usuario.', status: 'planned' }
];

export function findBusinessModule(moduleId: string): BusinessModule | undefined {
  return businessModules.find((businessModule) => businessModule.id === moduleId);
}