# RehabHur — Frontend

Aplicación web de telerehabilitación construida con React 19, TypeScript y Vite.
Consume la API REST de `rehabhur-api`.

## Requisitos

- Node.js 20 o superior
- npm
- La API de RehabHur corriendo (por defecto en `http://localhost:3000`)

## Desarrollo

```sh
npm install
npm run dev
```

Vite publica la aplicación en `http://localhost:5173`.

## Conexión con la API

La URL base se configura con la variable de entorno `VITE_API_URL`. Si no se
define, se usa `http://localhost:3000/api/v1`.

```sh
cp .env.example .env
```

La API debe permitir el origen del frontend en CORS y aceptar credenciales para
que funcione la renovación de sesión.

## Scripts

- `npm run dev`: servidor de desarrollo con HMR.
- `npm run build`: verificación de tipos y build de producción.
- `npm run lint`: análisis con ESLint.
- `npm run preview`: vista previa del build.

## Módulos conectados

- **Autenticación**: inicio de sesión con `/api/v1/auth/signin`; el access token
  se envía en las solicitudes y se renueva con la cookie del backend.
- **Ejercicios**: listado, búsqueda, creación, edición y eliminación contra
  `/api/v1/exercises`.
- **Opciones del formulario**: regiones corporales, tipos de movimiento y
  materiales desde `/api/v1/options`.
- **Personas**: listado por rol, creación, edición y eliminación contra
  `/api/v1/persons`.
- El frontend carga todos los resultados de personas y ejercicios usando la
  paginación de la API.
- **Programas**: la API actual no publica `/api/v1/programs`; el frontend ya no
  usa datos de demostración y muestra el error del backend hasta que exista ese
  módulo.

La persistencia depende de la configuración de base de datos del backend.

## Despliegue en Vercel

El archivo `vercel.json` configura el build de Vite y redirige las rutas del
frontend a `index.html`, necesario para que funcionen rutas como `/persons` al
recargar la página.

1. Importá el repositorio en Vercel. El proyecto detecta Vite; el build usa
   `npm run build` y publica `dist`.
2. En **Settings → Environment Variables**, definí `VITE_API_URL` para
   Production y Preview con la URL pública del backend, incluyendo `/api/v1`
   (por ejemplo, `https://api.ejemplo.com/api/v1`).
3. En el backend, agregá los orígenes exactos que uses (producción y previews)
   a `CORS_ORIGIN`, separados por comas, y habilitá credenciales. No uses `*`
   con credenciales. Para cookies de sesión entre dominios distintos,
   configurá `COOKIE_SAME_SITE=none` y `COOKIE_SECURE=true`.
4. Volvé a desplegar después de cambiar `VITE_API_URL`; Vite incorpora ese valor
   durante el build. No uses `localhost` en las variables de Vercel.

El entorno local sigue usando `http://localhost:3000/api/v1` como valor
predeterminado.

## Docker

Antes de empezar:

- Tener Docker Desktop abierto.
- Tener la API corriendo en `http://localhost:3000`.

Crear la imagen:

```sh
docker build --build-arg VITE_API_URL=http://localhost:3000/api/v1 -t rehabhur-front .
```

Correr el contenedor:

```sh
docker run -d --name rehabhur-front -p 8080:80 rehabhur-front
```

Con `docker ps` se puede ver si está corriendo. La aplicación queda en
`http://localhost:8080`.



