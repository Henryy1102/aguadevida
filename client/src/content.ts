export const stackItems = [
  'React',
  'Vite',
  'JavaScript ES6+',
  'HTML5',
  'CSS3',
  'Tailwind CSS',
  'Axios',
  'React Router DOM',
  'React Hook Form',
  'SweetAlert2',
  'Chart.js',
  'Node.js',
  'Express.js',
  'MongoDB Atlas',
  'JWT',
  'Bcrypt',
  'Cloudinary',
  'Vercel',
  'Render'
];

export const companySections = [
  {
    title: 'Nosotros',
    text: 'Agua de Vida es una empresa orientada a la comercialización y distribución de productos, con operación centralizada para ventas, inventario, facturación y atención al cliente.'
  },
  {
    title: 'Misión',
    text: 'Brindar una experiencia de compra confiable, ágil y segura, con control total de las operaciones comerciales y administrativas.'
  },
  {
    title: 'Visión',
    text: 'Ser una plataforma empresarial moderna, escalable y lista para crecer con comercio electrónico, punto de venta, reportes y automatización.'
  }
];

export const serviceItems = [
  'Ventas en línea y atención digital',
  'Punto de venta para atención presencial',
  'Gestión de inventario y control de stock',
  'Facturación y descarga de documentos',
  'Reportes y métricas administrativas',
  'Rutas de entrega y seguimiento de pedidos'
];

export const contactInfo = [
  { label: 'Teléfono', value: '+593 000 000 000' },
  { label: 'WhatsApp', value: '+593 000 000 000' },
  { label: 'Correo', value: 'info@aguadevida.com' },
  { label: 'Dirección', value: 'Ecuador' }
];

export const userRoles = [
  {
    name: 'Administrador General',
    access: 'Acceso total al sistema',
    permissions: [
      'Gestionar productos',
      'Gestionar usuarios',
      'Gestionar empleados',
      'Gestionar clientes',
      'Gestionar ventas',
      'Gestionar facturas',
      'Ver reportes',
      'Configurar sistema',
      'Gestionar rutas de entrega',
      'Gestionar notificaciones'
    ]
  },
  {
    name: 'Personal Administrativo',
    access: 'Operación comercial y administrativa',
    permissions: ['Gestionar clientes', 'Gestionar ventas', 'Gestionar facturación', 'Gestionar catálogo', 'Ver reportes']
  },
  {
    name: 'Empleado de Bodega',
    access: 'Control de inventario',
    permissions: ['Registrar entradas de inventario', 'Registrar salidas', 'Actualizar stock']
  },
  {
    name: 'Cliente Registrado',
    access: 'Compra y autogestión',
    permissions: ['Registrarse', 'Iniciar sesión', 'Ver catálogo', 'Comprar productos', 'Descargar facturas', 'Ver historial de compras', 'Editar perfil']
  },
  {
    name: 'Cliente Visitante',
    access: 'Consulta pública',
    permissions: ['Ver productos', 'Ver información empresarial', 'Contactar empresa']
  }
];

export const systemModules = [
  {
    title: 'Autenticación',
    status: 'Listo para construir',
    details: ['Registro', 'Inicio de sesión', 'Recuperar contraseña', 'Cambio de contraseña', 'Verificación de correo', 'Cerrar sesión', 'Roles: Admin, Administrativo, Bodega, Cliente']
  },
  {
    title: 'Gestión de usuarios',
    status: 'CRUD base',
    details: ['Nombre', 'Apellido', 'Cédula', 'Correo', 'Teléfono', 'Dirección', 'Contraseña', 'Rol', 'Estado', 'Activar / desactivar']
  },
  {
    title: 'Inventario',
    status: 'CRUD base',
    details: ['Código', 'Nombre', 'Descripción', 'Categoría', 'Precio', 'Stock', 'Stock mínimo', 'Imagen', 'Estado', 'Stock bajo / agotado']
  },
  {
    title: 'Categorías',
    status: 'CRUD base',
    details: ['Nombre', 'Descripción', 'Estado']
  },
  {
    title: 'Catálogo web',
    status: 'Vista pública',
    details: ['Imagen', 'Nombre', 'Precio', 'Descripción', 'Disponibilidad', 'Búsqueda', 'Filtros', 'Productos destacados']
  },
  {
    title: 'Carrito de compras',
    status: 'Base de e-commerce',
    details: ['Agregar producto', 'Eliminar producto', 'Modificar cantidad', 'Calcular subtotal', 'Calcular total']
  },
  {
    title: 'E-commerce',
    status: 'Flujo comercial',
    details: ['Seleccionar productos', 'Carrito', 'Datos cliente', 'Confirmación', 'Generación pedido', 'Facturación', 'Estados: pendiente, confirmado, preparando, en ruta, entregado, cancelado']
  },
  {
    title: 'POS',
    status: 'Ventas físicas',
    details: ['Buscar producto', 'Escanear código', 'Agregar productos', 'Generar ticket', 'Cobro', 'Efectivo, transferencia y tarjeta']
  },
  {
    title: 'Facturación',
    status: 'Preparada para SRI',
    details: ['Generar factura', 'Descargar PDF', 'Consultar factura', 'Historial de facturas', 'Número factura', 'Cliente', 'Fecha', 'Productos', 'Subtotal', 'IVA', 'Total']
  },
  {
    title: 'Clientes',
    status: 'CRUD base',
    details: ['Nombre', 'Correo', 'Teléfono', 'Dirección', 'Historial compras']
  },
  {
    title: 'Empleados',
    status: 'CRUD base',
    details: ['Nombre', 'Cargo', 'Correo', 'Teléfono', 'Rol', 'Estado']
  },
  {
    title: 'Reportes',
    status: 'Dashboard',
    details: ['Ventas diarias', 'Ventas semanales', 'Ventas mensuales', 'Productos más vendidos', 'Productos agotados', 'Clientes frecuentes', 'Inventario actual', 'Gráficos de barras, líneas y pastel']
  },
  {
    title: 'Notificaciones',
    status: 'Alertas automáticas',
    details: ['Stock bajo', 'Producto agotado', 'Venta realizada', 'Nuevo cliente registrado']
  },
  {
    title: 'Rutas de entrega',
    status: 'Gestión logística',
    details: ['Pedido', 'Cliente', 'Dirección', 'Estado', 'Pendiente', 'En preparación', 'En ruta', 'Entregado']
  },
  {
    title: 'Auditoría',
    status: 'Bitácora',
    details: ['Usuario', 'Fecha', 'Hora', 'Acción', 'Módulo afectado']
  },
  {
    title: 'Contacto',
    status: 'Portal público',
    details: ['Teléfono', 'WhatsApp', 'Correo', 'Dirección', 'Mapa Google Maps', 'Formulario de contacto']
  },
  {
    title: 'Información empresarial',
    status: 'Portal institucional',
    details: ['Inicio', 'Nosotros', 'Misión', 'Visión', 'Servicios', 'Productos', 'Contacto']
  }
];

export const adminKpis = [
  { label: 'Ventas hoy', value: '$1,240', hint: '+18% vs ayer' },
  { label: 'Pedidos activos', value: '24', hint: '6 en ruta' },
  { label: 'Stock bajo', value: '11', hint: 'Requiere reposición' },
  { label: 'Clientes nuevos', value: '8', hint: 'Últimas 24h' }
];

export const quickActions = [
  'Crear producto',
  'Registrar cliente',
  'Emitir factura',
  'Abrir POS',
  'Ver reportes',
  'Gestionar rutas'
];