# Agua de Vida Platform

Plataforma web MERN para administrar inventarios, ventas, clientes, empleados, facturación, reportes y comercio electrónico.

## Estructura

- `client`: frontend React + Vite
- `server`: API Node.js + Express + MongoDB

## Requisitos

- Node.js 20+
- MongoDB Atlas

## Variables de entorno

Copia `.env.example` a `.env` y completa las credenciales.

## Desarrollo

1. Desde la raíz del proyecto, instala todas las dependencias:

```bash
npm install
```

2. Copia el archivo de ejemplo de entorno a `.env` y completa las credenciales:

```bash
copy .env.example .env
```

3. Abre `.env` y configura al menos estas variables:

- `MONGODB_URI` con tu conexión a MongoDB Atlas
- `JWT_SECRET` con un secreto fuerte
- `CLIENT_URL` (por defecto `http://localhost:5173`)
- `PORT` (por defecto `4000`)

4. Inicia el backend y el frontend en modo desarrollo:

```bash
npm run dev
```

5. Accede a la aplicación desde tu navegador en:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

### Solución para `querySrv ECONNREFUSED` en MongoDB Atlas

Si obtienes un error como `querySrv ECONNREFUSED _mongodb._tcp.cluster0...`, prueba lo siguiente:

- Abre MongoDB Atlas y revisa `Network Access` / `IP Whitelist`.
- Permite tu IP actual o agrega `0.0.0.0/0` (solo en desarrollo).
- Verifica que el cluster esté activo y que el nombre del host sea correcto.
- Si tu red bloquea consultas SRV/DNS, usa el URI directo de MongoDB en lugar de `mongodb+srv://`.

> Si prefieres ejecutar cada servicio por separado:
> - `npm run dev --workspace server`
> - `npm run dev --workspace client`

## Despliegue

La base está pensada para Vercel en frontend y API serverless, con MongoDB Atlas como base de datos.
